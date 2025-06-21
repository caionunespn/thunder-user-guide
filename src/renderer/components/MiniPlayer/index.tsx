import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useThunder } from '../../contexts/Thunder';
import { MdMusicNote } from 'react-icons/md';
import { useTranslation } from 'react-i18next';

interface VideoInfo {
  embedUrl: string | null;
  platform: string | null;
}

const getVideoInfo = (url: string): VideoInfo => {
  if (!url || url.trim() === '') return { embedUrl: null, platform: null };

  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname;

    if (hostname.includes('youtube.com') || hostname.includes('youtu.be')) {
      let videoId: string | null = null;
      if (hostname.includes('youtube.com')) {
        videoId = new URLSearchParams(urlObj.search).get('v');
      } else if (hostname.includes('youtu.be')) {
        videoId = urlObj.pathname.slice(1);
      }
      if (videoId) {
        return {
          embedUrl: `https://www.youtube.com/embed/${videoId}?enablejsapi=1`,
          platform: 'youtube'
        };
      }
    }

    if (hostname.includes('vimeo.com')) {
      const videoId = urlObj.pathname.slice(1);
      if (videoId) {
        return {
          embedUrl: `https://player.vimeo.com/video/${videoId}?api=1`,
          platform: 'vimeo'
        };
      }
    }

    if (hostname.includes('dailymotion.com')) {
      const videoId = urlObj.pathname.split('/').pop();
      if (videoId) {
        return {
          embedUrl: `https://www.dailymotion.com/embed/video/${videoId}?api=postMessage`,
          platform: 'dailymotion'
        };
      }
    }

    if (hostname.includes('open.spotify.com')) {
      const pathParts = urlObj.pathname.split('/');
      const type = pathParts[pathParts.length - 2]; // track, album, playlist
      const id = pathParts[pathParts.length - 1];
      if (type && id) {
        return {
          embedUrl: `https://open.spotify.com/embed/${type}/${id}`,
          platform: 'spotify'
        };
      }
    }

    if (hostname.includes('soundcloud.com')) {
      return {
        embedUrl: `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&visual=true`,
        platform: 'soundcloud'
      };
    }

    return { embedUrl: null, platform: null };
  } catch (error) {
    return { embedUrl: null, platform: null };
  }
};

export function MiniPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const { mode, theme } = useTheme();
  const { data } = useThunder();
  const { t } = useTranslation();

  const musicData = data.conceptualization.musicDecisions.selectedMusic;
  const videoInfo = musicData.youtubeLink ? getVideoInfo(musicData.youtubeLink) : { embedUrl: null, platform: null };

  const colors = theme.colors[mode];
  const shadows = theme.shadows;
  const transitions = theme.transitions;

  if (!musicData.youtubeLink || !videoInfo.embedUrl) {
    return null;
  }

  return (
    <div className="fixed bottom-20 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full p-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2"
        style={{
          backgroundColor: colors.background.card,
          color: colors.text.primary,
          boxShadow: shadows.medium,
          transition: transitions.default
        }}
        aria-label={t('miniPlayer.toggle')}
        aria-expanded={isOpen}
        aria-controls="mini-player-content"
      >
        <MdMusicNote size={24} aria-hidden="true" focusable="false" />
      </button>

      {isOpen && (
        <div
          id="mini-player-content"
          className="absolute bottom-14 right-0 w-80 rounded-lg shadow-lg p-4"
          style={{
            backgroundColor: colors.background.card,
            boxShadow: shadows.large,
            borderColor: colors.border.light,
            borderWidth: 1
          }}
          role="dialog"
          aria-label={t('miniPlayer.title')}
        >
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold" style={{ color: colors.text.primary }}>
              {musicData.songName}
            </h3>

            <iframe
              title={t('miniPlayer.videoTitle')}
              src={videoInfo.embedUrl}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-md"
              style={{ width: '100%', height: '180px' }}
            />
          </div>
        </div>
      )}
    </div>
  );
} 