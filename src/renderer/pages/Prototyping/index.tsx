import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ThemeControls } from "../../components/ThemeControls";
import { useTheme } from "../../contexts/ThemeContext";
import { useThunder } from "../../contexts/Thunder";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
import { DIRECTORIES, STORE_KEYS } from "../../globals/constants";
import { MdAdd, MdDelete, MdImage, MdVideoLibrary } from "react-icons/md";
import { UploadedFile } from "../../contexts/Thunder/interfaces";
import type { ElectronAPI } from '../../types/electron';

const Prototyping = () => {
  const { t } = useTranslation();
  const params = useParams();
  const fidelity = params.fidelity ?? "medium";

  const { mode, theme } = useTheme();
  const stageColors = theme.colors[mode].stages.prototyping;
  const modeColors = theme.colors[mode];
  const typography = theme.typography;
  const shadows = theme.shadows;
  const transitions = theme.transitions;

  const { data, saveMediumPrototypingData, saveHighPrototypingData } = useThunder();
  const prototypeImages = data.prototyping[fidelity].images;
  const finalVideo = data.prototyping[fidelity].finalVideo;

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const reader = new FileReader();
      const fileData = await new Promise((resolve) => {
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });

      const fileName = `${uuidv4()}.${file.name.split('.').pop()}`;
      const savedFilePath = await (window.electron as ElectronAPI).saveFile(fileData, fileName, DIRECTORIES.IMAGES);

      const newImage = {
        id: uuidv4(),
        type: 'image' as const,
        url: savedFilePath,
        name: file.name
      };

      const updatedImages = [...prototypeImages, newImage];
      if (fidelity === "medium") {
        saveMediumPrototypingData({ images: updatedImages });
      } else {
        saveHighPrototypingData({ images: updatedImages });
      }
    } catch (err) {
      console.error('Error uploading image:', err);
    }
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const reader = new FileReader();
      const fileData = await new Promise((resolve) => {
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });

      const fileName = `${uuidv4()}.${file.name.split('.').pop()}`;
      const savedFilePath = await (window.electron as ElectronAPI).saveFile(fileData, fileName, DIRECTORIES.VIDEOS);

      const video = {
        id: uuidv4(),
        type: 'video' as const,
        url: savedFilePath,
        name: file.name
      }

      if (fidelity === "medium") {
        saveMediumPrototypingData({ finalVideo: video });
      } else {
        saveHighPrototypingData({ finalVideo: video });
      }
    } catch (err) {
      console.error('Error uploading video:', err);
    }
  };

  const handleDeleteImage = async (id: string) => {
    const updatedImages = prototypeImages.filter((img: UploadedFile) => img.id !== id);
    if (fidelity === "medium") {
      saveMediumPrototypingData({ images: updatedImages });
    } else {
      saveHighPrototypingData({ images: updatedImages });
    }
  };

  return (
    <div className="space-y-8">
      <div
        className="backdrop-blur-lg rounded-2xl p-8 shadow-xl border"
        style={{
          backgroundColor: mode === 'dark' ? modeColors.background.card : stageColors.background.card,
          borderColor: mode === 'dark' ? modeColors.border.light : stageColors.border.light,
          boxShadow: shadows.large
        }}
      >
        <h1
          className="text-center leading-tight mb-8"
          style={{
            fontSize: typography.h1.size,
            fontWeight: typography.h1.weight,
            lineHeight: typography.h1.lineHeight,
            color: mode === 'dark' ? modeColors.text.primary : stageColors.text.primary
          }}
        >
          {fidelity === "medium" ? t('prototyping.mediumFidelityTitle') : t('prototyping.highFidelityTitle')}
        </h1>

        <p
          className="text-center"
          style={{
            fontSize: typography.body.large.size,
            lineHeight: typography.body.large.lineHeight,
            color: modeColors.text.black
          }}
        >
          {t('prototyping.description')}
        </p>


      </div>
      <div className="space-y-6">
        <div
          className="backdrop-blur-lg rounded-2xl p-8 shadow-xl border"
          style={{
            backgroundColor: mode === 'dark' ? modeColors.background.card : stageColors.background.card,
            borderColor: mode === 'dark' ? modeColors.border.light : stageColors.border.light,
            boxShadow: shadows.large
          }}
        >
          <h2
            className="text-left leading-tight mb-4"
            style={{
              fontSize: typography.h2.size,
              fontWeight: typography.h2.weight,
              lineHeight: typography.h2.lineHeight,
              color: mode === 'dark' ? modeColors.text.primary : stageColors.text.primary
            }}
          >
            {t('prototyping.constructionImages')}
          </h2>
          <p
            className="text-md text-black leading-relaxed mb-6"
          >
            {t('prototyping.constructionImagesDescription')}
          </p>
          <div className="flex gap-4 mb-6">
            <input
              type="file"
              id="prototype-image-upload"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <label
              htmlFor="prototype-image-upload"
              className="group block py-4 px-6 backdrop-blur-md rounded-xl text-center border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
              style={{
                backgroundColor: mode === 'dark' ? modeColors.background.button.primary : stageColors.background.button.primary,
                boxShadow: shadows.medium,
                borderColor: mode === 'dark' ? modeColors.border.button.primary : stageColors.border.button,
                color: mode === 'dark' ? modeColors.background.button.text : stageColors.background.button.text,
                transition: transitions.default
              }}
            >
              <div className="flex items-center justify-center space-x-4">
                <MdImage size={20} />
                <span>{t('prototyping.uploadImage')}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
              </div>
            </label>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {prototypeImages.map((image) => (
              <div key={image.id} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden"
                  style={{
                    backgroundColor: mode === 'dark' ? modeColors.background.card : stageColors.background.card,
                    borderColor: mode === 'dark' ? modeColors.border.light : stageColors.border.light,
                    boxShadow: shadows.medium
                  }}
                >
                  <img
                    src={image.url}
                    alt={image.name || 'Imagem do protótipo'}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={() => handleDeleteImage(image.id)}
                  aria-label="Remover imagem"
                  className="absolute top-2 right-2 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    backgroundColor: mode === 'dark' ? modeColors.background.button.secondary : stageColors.background.button.secondary,
                    borderColor: mode === 'dark' ? modeColors.border.button.secondary : stageColors.border.button,
                    color: mode === 'dark' ? modeColors.background.button.text : stageColors.background.button.text,
                    boxShadow: shadows.medium
                  }}
                >
                  <MdDelete size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div
          className="backdrop-blur-lg rounded-2xl p-8 shadow-xl border"
          style={{
            backgroundColor: mode === 'dark' ? modeColors.background.card : stageColors.background.card,
            borderColor: mode === 'dark' ? modeColors.border.light : stageColors.border.light,
            boxShadow: shadows.large
          }}
        >
          <h2
            className="text-left leading-tight mb-4"
            style={{
              fontSize: typography.h2.size,
              fontWeight: typography.h2.weight,
              lineHeight: typography.h2.lineHeight,
              color: mode === 'dark' ? modeColors.text.primary : stageColors.text.primary
            }}
          >
            {t('prototyping.finalVideo')}
          </h2>
          <p
            className="text-md text-black leading-relaxed mb-6"
          >
            {t('prototyping.finalVideoDescription')}
          </p>
          <div className="flex gap-4 mb-6">
            <input
              type="file"
              id="prototype-video-upload"
              accept="video/*"
              onChange={handleVideoUpload}
              className="hidden"
            />
            <label
              htmlFor="prototype-video-upload"
              className="group block backdrop-blur-md rounded-xl py-4 px-6 text-center border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
              style={{
                backgroundColor: mode === 'dark' ? modeColors.background.button.primary : stageColors.background.button.primary,
                boxShadow: shadows.medium,
                borderColor: mode === 'dark' ? modeColors.border.button.primary : stageColors.border.button,
                color: mode === 'dark' ? modeColors.background.button.text : stageColors.background.button.text,
                transition: transitions.default
              }}
            >
              <div className="flex items-center justify-center space-x-4">
                <MdVideoLibrary size={20} />
                <span>{t('prototyping.uploadVideo')}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
              </div>
            </label>
          </div>
          {finalVideo?.url && (
            <div className="w-full aspect-video rounded-lg overflow-hidden"
              style={{
                backgroundColor: mode === 'dark' ? modeColors.background.card : stageColors.background.card,
                borderColor: mode === 'dark' ? modeColors.border.light : stageColors.border.light,
                boxShadow: shadows.medium
              }}
            >
              <video
                src={finalVideo?.url}
                controls
                className="w-full h-full object-contain"
              />
            </div>
          )}
        </div>
      </div>
      <ThemeControls />
    </div>
  );
};

export default Prototyping;
