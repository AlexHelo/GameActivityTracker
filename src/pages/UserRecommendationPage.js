import React from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/TwoColumnWithVideo.js";
//import Header from "../headers/light.js";
import Features from "components/features/ThreeColSimple.js";
import MainFeature from "components/features/TwoColWithButton.js";
import MainFeature2 from "components/features/TwoColSingleFeatureWithStats2.js";
import TabGrid from "components/cards/ThreeColSlider";
import Testimonial from "components/testimonials/ThreeColumnWithProfileImage";
import DownloadApp from "components/cta/DownloadApp.js";
import Footer from "components/footers/MiniCenteredFooter";

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
        primaryButtonUrl = "/Signup"
        watchVideoButtonText="Why Music?"
        //watchVideoYoutubeUrl=""
      />
      {/* TabGrid Component also accepts a tabs prop to customize the tabs and its content directly. Please open the TabGrid component file to see the structure of the tabs props.*/}
      <TabGrid 
        heading={
          <>
            Check your <HighlightedText>recommendations.</HighlightedText>
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
        primaryButtonUrl = "/Signup"
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
