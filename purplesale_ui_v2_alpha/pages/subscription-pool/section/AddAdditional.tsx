"use client";
import React, { useState, useEffect, useContext } from "react";
import FormContext from "@/contexts/create/FormContext";
import BgInput from "@/components/TailwindWrapper/InputBg/BgInput";
import Image from "next/image";

type AddAdditionalProps = {
  onStepValidation: (isValid: boolean) => void;
};

const AddAdditional: React.FC<AddAdditionalProps> = ({ onStepValidation }) => {
  const [isValidLogoUrl, setIsValidLogoUrl] = useState(false);
  const [isValidBgLogoUrl, setIsValidBgLogoUrl] = useState(false);

  const [isValidWebsiteUrl, setIsValidWebsiteUrl] = useState(false);
  const [isValidDescription, setIsValidDescription] = useState(false);
  const {
    setLogoUrl,
    setBgLogoUrl,
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
    logoUrl,
    bgLogoUrl,
    websiteUrl,
    description,
  } = useContext(FormContext);
  const handleLogoUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogoUrl(event.target.value);
    setIsValidLogoUrl(false);
  };

  const handleBgLogoUrlChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setBgLogoUrl(event.target.value);
    setIsValidBgLogoUrl(false);
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
    return isValidLogoUrl && isValidDescription && isValidWebsiteUrl;
  };

  useEffect(() => {
    onStepValidation(isFormValid());
  }, [isValidLogoUrl, isValidWebsiteUrl, onStepValidation]);

  return (
    <>
      <BgInput>
        <div className="col-span-1">
          <p className="flex">
            <Image
              src={"/Line.svg"}
              alt={"Line"}
              width={3}
              height={2}
              className="inputImageBar"
            />
            <label htmlFor="description" className="inputHeading">
              Description<span className="inputRequired">*</span>
            </label>
          </p>
          <input
            id="description"
            name="description"
            type="text"
            placeholder="Your description"
            className="input"
            value={description}
            onChange={handleDescriptionChange}
            onBlur={checkDescriptionValidity}
            required
          />
        </div>
      </BgInput>
      <BgInput>
        <div className="col-span-1">
          <p className="flex">
            <Image
              src={"/Line.svg"}
              alt={"Line"}
              width={3}
              height={2}
              className="inputImageBar"
            />
            <label htmlFor="logoUrl" className="inputHeading">
              Logo URL<span className="inputRequired">*</span>
            </label>
          </p>
          <input
            id="logoUrl"
            name="logoUrl"
            type="text"
            placeholder="Ex: https://logo.png"
            className="input"
            value={logoUrl}
            onChange={handleLogoUrlChange}
            onBlur={checkLogoUrlValidity}
            required
          />
          {!isValidLogoUrl && logoUrl.trim() !== "" && (
            <p className="text-red-500">Invalid logo URL</p>
          )}
        </div>
      </BgInput>
      <BgInput>
        <p className="flex">
          <Image
            src={"/Line.svg"}
            alt={"Line"}
            width={3}
            height={2}
            className="inputImageBar"
          />
          <label htmlFor="logoUrl" className="inputHeading">
            Background Image URL<span className="inputRequired">*</span>
          </label>
        </p>
        <input
          id="bgLogoUrl"
          name="bgLogoUrl"
          type="text"
          placeholder="Ex: https://logo.png"
          className="input"
          value={bgLogoUrl}
          onChange={handleBgLogoUrlChange}
          onBlur={checkLogoUrlValidity}
          required
        />
        {!isValidBgLogoUrl && bgLogoUrl.trim() !== "" && (
          <p className="inputAlert">Invalid BG logo URL</p>
        )}
      </BgInput>
      <BgInput>
        <div className="col-span-1">
          <p className="flex">
            <Image
              src={"/Line.svg"}
              alt={"Line"}
              width={3}
              height={2}
              className="inputImageBar"
            />
            <label htmlFor="websiteUrl" className="inputHeading">
              Website<span className="inputRequired">*</span>
            </label>
          </p>
          <input
            id="websiteUrl"
            name="websiteUrl"
            type="text"
            placeholder="Ex: https://.."
            className="input"
            value={websiteUrl}
            onChange={handleWebsiteUrlChange}
            onBlur={checkWebsiteUrlValidity}
            required
          />
          {!isValidWebsiteUrl && websiteUrl.trim() !== "" && (
            <p className="text-red-500">Invalid website URL</p>
          )}
        </div>
      </BgInput>

      <BgInput>
        <div className="col-span-1">
          <p className="flex">
            <Image
              src={"/Line.svg"}
              alt={"Line"}
              width={3}
              height={2}
              className="inputImageBar"
            />
            <label htmlFor="facebook" className="inputHeading">
              Facebook
            </label>
          </p>
          <input
            id="facebook"
            name="facebook"
            type="text"
            placeholder="Ex:https://Facebook.com/.."
            className="input"
            onChange={handleFacebookChange}
          />
        </div>
      </BgInput>
      <BgInput>
        <div className="col-span-1">
          <p className="flex">
            <Image
              src={"/Line.svg"}
              alt={"Line"}
              width={3}
              height={2}
              className="inputImageBar"
            />
            <label htmlFor="twitter" className="inputHeading">
              Twitter
            </label>
          </p>
          <input
            id="twitter"
            name="twitter"
            type="text"
            placeholder="Ex:https://Twitter.com/.."
            className="input"
            onChange={handleTwitterChange}
          />
        </div>
      </BgInput>
      <BgInput>
        <div className="col-span-1">
          <p className="flex">
            <Image
              src={"/Line.svg"}
              alt={"Line"}
              width={3}
              height={2}
              className="inputImageBar"
            />
            <label htmlFor="github" className="inputHeading">
              Github
            </label>
          </p>
          <input
            id="github"
            name="github"
            type="text"
            placeholder="Ex:https://Github.com/.."
            className="input"
            onChange={handleGithubChange}
          />
        </div>
      </BgInput>
      <BgInput>
        <div className="col-span-1">
          <p className="flex">
            <Image
              src={"/Line.svg"}
              alt={"Line"}
              width={3}
              height={2}
              className="inputImageBar"
            />
            <label htmlFor="telegram" className="inputHeading">
              Telegram
            </label>
          </p>
          <input
            id="telegram"
            name="telegram"
            type="text"
            placeholder="Ex:https://Telegram.com/.."
            className="input"
            onChange={handleTelegramChange}
          />
        </div>
      </BgInput>
      <BgInput>
        <div className="col-span-1">
          <p className="flex">
            <Image
              src={"/Line.svg"}
              alt={"Line"}
              width={3}
              height={2}
              className="inputImageBar"
            />
            <label htmlFor="instagram" className="inputHeading">
              Instagram
            </label>
          </p>
          <input
            id="instagram"
            name="instagram"
            type="text"
            placeholder="Ex:https://Instagram.com/.."
            className="input"
            onChange={handleInstagramChange}
          />
        </div>
      </BgInput>
      <BgInput>
        <div className="col-span-1">
          <p className="flex">
            <Image
              src={"/Line.svg"}
              alt={"Line"}
              width={3}
              height={2}
              className="inputImageBar"
            />
            <label htmlFor="discord" className="inputHeading">
              Discord
            </label>
          </p>
          <input
            id="discord"
            name="discord"
            type="text"
            placeholder="Ex:https://Discord.com/.."
            className="input"
            onChange={handleDiscordChange}
          />
        </div>
      </BgInput>
      <BgInput>
        <div className="col-span-1">
          <p className="flex">
            <Image
              src={"/Line.svg"}
              alt={"Line"}
              width={3}
              height={2}
              className="inputImageBar"
            />
            <label htmlFor="reddit" className="inputHeading">
              Reddit
            </label>
          </p>
          <input
            id="reddit"
            name="reddit"
            type="text"
            placeholder="Ex:https://Reddit.com/.."
            className="input"
            onChange={handleRedditChange}
          />
        </div>
      </BgInput>
      <BgInput>
        <div className="col-span-1">
          <p className="flex">
            <Image
              src={"/Line.svg"}
              alt={"Line"}
              width={3}
              height={2}
              className="inputImageBar"
            />
            <label htmlFor="youtube" className="inputHeading">
              Youtube Video
            </label>
          </p>
          <input
            id="youtube"
            name="youtube"
            type="text"
            placeholder="Ex:https://Youtube.com/.."
            className="input"
            onChange={handleYoutubeChange}
          />
        </div>
      </BgInput>
    </>
  );
};

export default AddAdditional;
