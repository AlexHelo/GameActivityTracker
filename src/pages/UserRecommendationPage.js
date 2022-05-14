import React from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/BackgroundAsImageWithCenteredContent";
import Features from "components/features/ThreeColSimple.js";
import MainFeature from "components/features/TwoColWithButton.js";
import MainFeature2 from "components/features/TwoColSingleFeatureWithStats2.js";
import TabGrid from "components/cards/ThreeColSlider";
import Testimonial from "components/testimonials/ThreeColumnWithProfileImage";
import DownloadApp from "components/cta/DownloadApp.js";
import Footer from "components/footers/MiniCenteredFooter";

import goku from "images/7.png";

export default () => {
  const Subheading = tw.span`tracking-wider text-sm font-medium`;
  const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;
  const HighlightedTextInverse = tw.span`bg-gray-100 text-primary-500 px-4 transform -skew-x-12 inline-block`;
  const Description = tw.span`inline-block mt-8`;
  const imageCss = tw`rounded-4xl`;
  //const cardInfo = 
  var userId= '76561198020735370'
  var recentGames
  var gamesInfo = []
  
  var yourGames = []
  RecentGames(userId).then((gamesinfo)=>AddYourGames(gamesinfo))

  async function RecentGames(userKey) {
    await fetch("http://localhost:3001/getrecentlyplayed?"+userKey)
    .then(response => response.json())
    .then(data =>  data.response)
    .then(games => recentGames = games.games)
    //console.log(recentGames)
    recentGames.forEach(game => {
      fetch("http://localhost:3001/getGameInfo?"+game.appid)
      .then(response => response.json())
      .then(check => gamesInfo.push(check[game.appid].data))
      //.then((gamess)=> {return gamess})
    });
    console.log(gamesInfo)
    return gamesInfo;
  }

  function AddYourGames(info){
    console.log(info)
    info.map(game => {
      console.log("F")
      yourGames.push({
        imageSrc: game.header_image,
        title: game.name,
        description: game.short_description,
        genre : [game.categories[0],game.categories[1],game.categories[2]],
        type	: game.type})
    });
    
  }


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
        cards = {yourGames}
      />
      <Footer />
    </AnimationRevealPage>
  );
}
