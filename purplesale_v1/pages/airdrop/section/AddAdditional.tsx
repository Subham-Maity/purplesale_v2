"use client";
import React, { useState, useEffect, useContext } from "react";
import FormContext from "@/contexts/create/FormContext";
import { useContractRead } from "wagmi";
import { airdropAbi, airdropAddress } from "@/constants/createConstants";
import { enqueueSnackbar } from "notistack";

type AddAdditionalProps = {
  onStepValidation: (isValid: boolean) => void;
};

const AddAdditional: React.FC<AddAdditionalProps> = ({ onStepValidation }) => {
  const [airDropTitle, setAirDropTitle] = useState(false);
  const [isValidLogoUrl, setIsValidLogoUrl] = useState(false);
  const [isValidWebsiteUrl, setIsValidWebsiteUrl] = useState(false);
  const [isValidDescription, setIsValidDescription] = useState(false);
  const {
    setLogoUrl,
    setWebsiteUrl,
    setDescription,
    setFacebook,
    setTwitter,
    setGithub,
    setTelegram,
    setInstagram,
    setDiscord,
    setReddit,
    setYoutube,
    setAirdrop,
    logoUrl,
    websiteUrl,
    description,
    airDrop,
  } = useContext(FormContext);

  const handleAirDropTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setAirdrop(event.target.value);
    setAirDropTitle(false);
  };

  const handleLogoUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogoUrl(event.target.value);
    setIsValidLogoUrl(false);
  };

  const handleWebsiteUrlChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setWebsiteUrl(event.target.value);
    setIsValidWebsiteUrl(false);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDescription(event.target.value);
    setIsValidDescription(false);
  };

  const handleFacebookChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFacebook(event.target.value);
  };
  const handleTwitterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTwitter(event.target.value);
  };
  const handleGithubChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGithub(event.target.value);
  };

  const handleTelegramChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTelegram(event.target.value);
  };

  const handleInstagramChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInstagram(event.target.value);
  };

  const handleDiscordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDiscord(event.target.value);
  };

  const handleRedditChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReddit(event.target.value);
  };

  const handleYoutubeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setYoutube(event.target.value);
  };

  const checkAirDropTitleValidity = () => {
    // You can use any regex or logic to validate the logo url format
    const isAirDropTitleFormatValid = /^.*/i.test(airDrop);

    setAirDropTitle(isAirDropTitleFormatValid);
  };
  const checkLogoUrlValidity = () => {
    if (logoUrl.trim() === "") {
      setIsValidLogoUrl(false);
      return;
    }

    // You can use any regex or logic to validate the logo url format
    const isLogoUrlFormatValid = /^https?:\/\/.+\/.+.(png|jpg|jpeg|svg)$/i.test(
      logoUrl,
    );

    setIsValidLogoUrl(isLogoUrlFormatValid);
  };

  const checkWebsiteUrlValidity = () => {
    if (websiteUrl.trim() === "") {
      setIsValidWebsiteUrl(false);
      return;
    }

    const isWebsiteUrlFormatValid = /^https?:\/\/.+$/i.test(websiteUrl);

    setIsValidWebsiteUrl(isWebsiteUrlFormatValid);
  };
  const checkDescriptionValidity = () => {
    // Check if the description contains a valid URL (http or https)
    const isDescriptionFormatValid = /^.*/i.test(description);

    setIsValidDescription(isDescriptionFormatValid);
  };

  const isFormValid = (): boolean => {
    return (
      isValidLogoUrl && isValidDescription && isValidWebsiteUrl && airDropTitle
    );
  };

  useEffect(() => {
    onStepValidation(isFormValid());
  }, [
    isValidLogoUrl,
    isValidWebsiteUrl,
    isValidDescription,
    airDropTitle,
    onStepValidation,
  ]);

  return (
    <div className="flex justify-center items-center ">
      <div className="lg:w-[1060px] dark:bg-[#242525] bg-stone-50 rounded-md p-6">
        <div>
          <form className="px-3 py-3">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2">
              <div className="col-span-1">
                <label htmlFor="logoUrl" className="block mb-1 font-bold">
                  Airdrop Title*
                </label>
                <input
                  id="airDropTitle"
                  name="airDropTitle"
                  type="text"
                  placeholder="Ex: Airdrop Title"
                  className="w-full px-2 py-1 border rounded-md"
                  value={airDrop}
                  onChange={handleAirDropTitleChange}
                  onBlur={checkAirDropTitleValidity}
                  required
                />
                {!isValidLogoUrl && logoUrl.trim() !== "" && (
                  <p className="text-red-500">Invalid Title</p>
                )}
              </div>
              <div className="col-span-1">
                <label htmlFor="logoUrl" className="block mb-1 font-bold">
                  Logo URL*
                </label>
                <input
                  id="logoUrl"
                  name="logoUrl"
                  type="text"
                  placeholder="Ex: https://logo.png"
                  className="w-full px-2 py-1 border rounded-md"
                  value={logoUrl}
                  onChange={handleLogoUrlChange}
                  onBlur={checkLogoUrlValidity}
                  required
                />
                {!isValidLogoUrl && logoUrl.trim() !== "" && (
                  <p className="text-red-500">Invalid logo URL</p>
                )}
              </div>
              <div className="col-span-1">
                <label htmlFor="websiteUrl" className="block mb-1 font-bold">
                  Website*
                </label>
                <input
                  id="websiteUrl"
                  name="websiteUrl"
                  type="text"
                  placeholder="Ex: https://.."
                  className="w-full px-2 py-1 border rounded-md"
                  value={websiteUrl}
                  onChange={handleWebsiteUrlChange}
                  onBlur={checkWebsiteUrlValidity}
                  required
                />
                {!isValidWebsiteUrl && websiteUrl.trim() !== "" && (
                  <p className="text-red-500">Invalid website URL</p>
                )}
              </div>
              <div className="col-span-1">
                <label htmlFor="description" className="block mb-1 font-bold">
                  Description*
                </label>
                <input
                  id="description"
                  name="description"
                  type="text"
                  placeholder="Your description"
                  className="w-full px-2 py-1 border rounded-md"
                  value={description}
                  onChange={handleDescriptionChange}
                  onBlur={checkDescriptionValidity}
                  required
                />
              </div>
              <div className="col-span-1">
                <label htmlFor="facebook" className="block mb-1 font-bold">
                  Facebook
                </label>
                <input
                  id="facebook"
                  name="facebook"
                  type="text"
                  placeholder="Ex:https://Facebook.com/.."
                  className="w-full px-2 py-1 border rounded-md"
                  onChange={handleFacebookChange}
                />
              </div>
              <div className="col-span-1">
                <label htmlFor="twitter" className="block mb-1 font-bold">
                  Twitter
                </label>
                <input
                  id="twitter"
                  name="twitter"
                  type="text"
                  placeholder="Ex:https://Twitter.com/.."
                  className="w-full px-2 py-1 border rounded-md"
                  onChange={handleTwitterChange}
                />
              </div>
              <div className="col-span-1">
                <label htmlFor="github" className="block mb-1 font-bold">
                  Github
                </label>
                <input
                  id="github"
                  name="github"
                  type="text"
                  placeholder="Ex:https://Github.com/.."
                  className="w-full px-2 py-1 border rounded-md"
                  onChange={handleGithubChange}
                />
              </div>
              <div className="col-span-1">
                <label htmlFor="telegram" className="block mb-1 font-bold">
                  Telegram
                </label>
                <input
                  id="telegram"
                  name="telegram"
                  type="text"
                  placeholder="Ex:https://Telegram.com/.."
                  className="w-full px-2 py-1 border rounded-md"
                  onChange={handleTelegramChange}
                />
              </div>
              <div className="col-span-1">
                <label htmlFor="instagram" className="block mb-1 font-bold">
                  Instagram
                </label>
                <input
                  id="instagram"
                  name="instagram"
                  type="text"
                  placeholder="Ex:https://Instagram.com/.."
                  className="w-full px-2 py-1 border rounded-md"
                  onChange={handleInstagramChange}
                />
              </div>
              <div className="col-span-1">
                <label htmlFor="discord" className="block mb-1 font-bold">
                  Discord
                </label>
                <input
                  id="discord"
                  name="discord"
                  type="text"
                  placeholder="Ex:https://Discord.com/.."
                  className="w-full px-2 py-1 border rounded-md"
                  onChange={handleDiscordChange}
                />
              </div>

              <div className="col-span-1">
                <label htmlFor="reddit" className="block mb-1 font-bold">
                  Reddit
                </label>
                <input
                  id="reddit"
                  name="reddit"
                  type="text"
                  placeholder="Ex:https://Reddit.com/.."
                  className="w-full px-2 py-1 border rounded-md"
                  onChange={handleRedditChange}
                />
              </div>
              <div className="col-span-1">
                <label htmlFor="youtube" className="block mb-1 font-bold">
                  Youtube Video
                </label>
                <input
                  id="youtube"
                  name="youtube"
                  type="text"
                  placeholder="Ex:https://Youtube.com/.."
                  className="w-full px-2 py-1 border rounded-md"
                  onChange={handleYoutubeChange}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAdditional;
