import React from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/TwoColumnWithVideo.js";
import Features from "components/features/ThreeColSimple.js";
import MainFeature from "components/features/TwoColWithButton.js";
import MainFeature2 from "components/features/TwoColSingleFeatureWithStats2.js";
import TabGrid from "components/cards/TabCardGrid";
import Testimonial from "components/testimonials/ThreeColumnWithProfileImage";
import DownloadApp from "components/cta/DownloadApp.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";

import chefIconImageSrc from "images/chef-icon.svg";
import celebrationIconImageSrc from "images/celebration-icon.svg";
import shopIconImageSrc from "images/shop-icon.svg";
import goku from "images/7.png";
import doomE from "images/9.jpg"
import smash from "images/4.jpg"

export default () => {
  const Subheading = tw.span`tracking-wider text-sm font-medium`;
  const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;
  const HighlightedTextInverse = tw.span`bg-gray-100 text-primary-500 px-4 transform -skew-x-12 inline-block`;
  const Description = tw.span`inline-block mt-8`;
  const imageCss = tw`rounded-4xl`;
  //Test
  return (
    <AnimationRevealPage>
      <Hero
        heading={<>Music recommendations based on your <HighlightedText>Gaming Preferences</HighlightedText></>}
        description="With GameChord it is very easy to find the perfect music for every gaming moment."
        imageSrc= {goku}
        imageCss={imageCss}
        imageDecoratorBlob={true}
        primaryButtonText="Sign up"
        watchVideoButtonText="Login"
      />
      <MainFeature
        subheading={<Subheading>We use APIs to get every recommendation</Subheading>}
        heading={
          <>
            We know how difficult is to find your 
            <wbr /> <HighlightedText>new favorite song.</HighlightedText>
          </>
        }
        description={
          <Description>
            In order to find and get your every taste of your gaming needs, we use the <HighlightedText>Steam API</HighlightedText> to know your gaming hobbies and the games you enjoyed the most.
            <br />
            <br />
            And in order to show you and see if you like those recommendations we use the <HighlightedText>Spotify API</HighlightedText> so you can play along and add them to your playlist
          </Description>
        }
        buttonRounded={false}
        textOnLeft={false}
        primaryButtonText="About us"
        imageSrc={
          doomE
        }
        imageCss={imageCss}
        imageDecoratorBlob={true}
        imageDecoratorBlobCss={tw`left-1/2 -translate-x-1/2 md:w-32 md:h-32 opacity-25`}
      />
      {/* TabGrid Component also accepts a tabs prop to customize the tabs and its content directly. Please open the TabGrid component file to see the structure of the tabs props.*/}
      <TabGrid
        heading={
          <>
            Check our <HighlightedText>recommendations.</HighlightedText>
          </>
        }

      />
      <MainFeature2
        subheading={<Subheading>An ever growing community</Subheading>}
        heading={<>Why are we <HighlightedText>your best option?</HighlightedText></>}
        description = {
        <Description>
          We use an algorithm that finds songs related to your <HighlightedText>player profile.</HighlightedText>
          <br></br>
          To do this we have to know what <HighlightedText>type of gamer</HighlightedText> you are and what games you are most looking to play.
        </Description>}
        statistics={[
          {
            key: "Hours played",
            value: "94000+",
          },
          {
            key: "Players",
            value: "1100+"
          },
          {
            key: "Recomendations",
            value: "15000+"
          }
        ]}
        primaryButtonText="Sign up"
        primaryButtonUrl="https://order.now.com"
        imageInsideDiv={false}
        imageSrc= {smash}
        imageCss={Object.assign(tw`bg-cover`, imageCss)}
        imageContainerCss={tw`md:w-1/2 h-auto`}
        imageDecoratorBlob={true}
        imageDecoratorBlobCss={tw`left-1/2 md:w-32 md:h-32 -translate-x-1/2 opacity-25`}
        textOnLeft={true}
      />
      <Testimonial
        subheading=""
        heading={<>Gamers <HighlightedText>Love Us.</HighlightedText></>}
      />
      <Footer />
    </AnimationRevealPage>
  );
}
