import React, { useState } from "react";
import { useTheme } from "../../../contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { useThunder } from "../../../contexts/Thunder";

interface VideoInfo {
  embedUrl: string | null;
  platform: string | null;
}

const MusicChoice = () => {
  const { t } = useTranslation();
  const { mode, theme } = useTheme();
  const { data, saveMusicDecisions } = useThunder();
  const [urlError, setUrlError] = useState<string | null>(null);
  const musicData = data.conceptualization.musicDecisions.selectedMusic;
  const stageColors = theme.colors[mode].stages.conceptualization;
  const modeColors = theme.colors[mode];
  const typography = theme.typography;
  const shadows = theme.shadows;

  const getVideoInfo = (url: string): VideoInfo => {
    if (!url || url.trim() === '') return { embedUrl: null, platform: null };

    try {
      const urlObj = new URL(url);
      const hostname = urlObj.hostname;

      // YouTube
      if (hostname.includes('youtube.com') || hostname.includes('youtu.be')) {
        let videoId: string | null = null;
        if (hostname.includes('youtube.com')) {
          videoId = new URLSearchParams(urlObj.search).get('v');
        } else if (hostname.includes('youtu.be')) {
          videoId = urlObj.pathname.slice(1);
        }
        if (videoId) {
          return {
            embedUrl: `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`,
            platform: 'youtube'
          };
        }
      }

      // Vimeo
      if (hostname.includes('vimeo.com')) {
        const videoId = urlObj.pathname.slice(1);
        if (videoId) {
          return {
            embedUrl: `https://player.vimeo.com/video/${videoId}?autoplay=0`,
            platform: 'vimeo'
          };
        }
      }

      // Dailymotion
      if (hostname.includes('dailymotion.com')) {
        const videoId = urlObj.pathname.split('/').pop();
        if (videoId) {
          return {
            embedUrl: `https://www.dailymotion.com/embed/video/${videoId}?autoplay=0`,
            platform: 'dailymotion'
          };
        }
      }

      return { embedUrl: null, platform: null };
    } catch (error) {
      return { embedUrl: null, platform: null };
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'youtubeLink') {
      if (!value || value.trim() === '') {
        setUrlError(null);
      } else {
        const videoInfo = getVideoInfo(value);
        setUrlError(videoInfo.embedUrl ? null : t('musicChoice.invalidVideoUrl'));
      }
    }

    saveMusicDecisions({
      selectedMusic: {
        ...musicData,
        [name]: value,
      }
    });
  };

  const videoInfo = musicData.youtubeLink ? getVideoInfo(musicData.youtubeLink) : { embedUrl: null, platform: null };

  return (
    <div
      className="backdrop-blur-lg rounded-2xl p-8 shadow-xl border"
      style={{
        backgroundColor: mode === 'dark' ? modeColors.background.card : stageColors.background.card,
        borderColor: mode === 'dark' ? modeColors.border.light : stageColors.border.light,
        boxShadow: shadows.large
      }}
    >
      <h2
        className="text-left leading-tight mb-6"
        style={{
          fontSize: typography.h2.size,
          fontWeight: typography.h2.weight,
          lineHeight: typography.h2.lineHeight,
          color: mode === 'dark' ? modeColors.text.primary : stageColors.text.primary
        }}
      >
        {t('musicChoice.title')}
      </h2>
      <p
        className="text-md text-black leading-relaxed mb-6"
      >
        {t('musicChoice.description')}
      </p>
      <div className="mt-8">
        {videoInfo.embedUrl && (
          <div className="player-wrapper" style={{ width: '100%', height: '400px' }}>
            <iframe
              src={videoInfo.embedUrl}
              style={{ width: '100%', height: '100%', borderRadius: '0.375rem' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
        {videoInfo.embedUrl && (
          <p className="text-sm text-gray-500 mt-2">
            {t('musicChoice.videoDisclaimer')}
          </p>
        )}
      </div>
      <form className="space-y-6 mt-8">
        <div>
          <label
            htmlFor="song-name"
            className="block text-sm font-medium mb-2"
            style={{ color: mode === 'dark' ? modeColors.text.primary : stageColors.text.primary }}
          >
            {t('musicChoice.songName')}
          </label>
          <input
            type="text"
            id="song-name"
            name="songName"
            value={musicData.songName}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md"
            style={{
              backgroundColor: mode === 'dark' ? modeColors.background.card : stageColors.background.card,
              borderColor: mode === 'dark' ? modeColors.border.light : stageColors.border.light,
              color: mode === 'dark' ? modeColors.text.primary : stageColors.text.primary
            }}
          />
        </div>
        <div>
          <label
            htmlFor="youtube-link"
            className="block text-sm font-medium mb-2"
            style={{ color: mode === 'dark' ? modeColors.text.primary : stageColors.text.primary }}
          >
            {t('musicChoice.videoLink')}
          </label>
          <input
            type="url"
            id="youtube-link"
            name="youtubeLink"
            value={musicData.youtubeLink}
            onChange={handleInputChange}
            placeholder="https://www.youtube.com/watch?v=... ou https://vimeo.com/..."
            className="w-full px-3 py-2 border rounded-md"
            style={{
              backgroundColor: mode === 'dark' ? modeColors.background.card : stageColors.background.card,
              borderColor: urlError ? 'red' : (mode === 'dark' ? modeColors.border.light : stageColors.border.light),
              color: mode === 'dark' ? modeColors.text.primary : stageColors.text.primary
            }}
          />
          {urlError && (
            <p className="text-red-500 text-sm mt-1">
              {urlError}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default MusicChoice;