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
import { SectionHeading } from "components/misc/Headings.js";
import Footer from "components/footers/MiniCenteredFooter";
import styled from "styled-components";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";

import TwoColButton from "../components/features/DashedBorderSixFeatures"

import goku from "images/7.png";

const Container = tw.div`relative`;

const ThreeColumnContainer = styled.div`
  ${tw`flex flex-col items-center md:items-stretch md:flex-row flex-wrap md:justify-center max-w-screen-xl mx-auto py-20 md:py-24`}
`;
const Heading = tw(SectionHeading)`w-full`;

const PrimaryButton = tw(PrimaryButtonBase)`px-40 py-10 mt-20 md:mt-10 text-6xl inline-block mx-auto md:mx-0`;

export default () => {
  const Subheading = tw.span`tracking-wider text-sm font-medium`;
  const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;
  const HighlightedTextInverse = tw.span`bg-gray-100 text-primary-500 px-4 transform -skew-x-12 inline-block`;
  const Description = tw.span`inline-block mt-8`;
  const imageCss = tw`rounded-4xl`;
  //const cardInfo = 
  var userId= '76561198020735370'
  var [recentGames,setRecentGames] = React.useState()
  var [gamesInfo,setGamesInfo] = React.useState([])
  
  var [yourGames,setYourGames] = React.useState([])

  var [showRecommendations, setShowRecommendations] = React.useState(false)

  
  function setRecomendations(){
    //RecentGames(userId).then((gamesinfo)=>AddYourGames(gamesinfo))
    infoGames([569480,1905180])
  }
  var infoGames = async (gameId) => {
    let i=0;
    let codeList=[]
    for(i;i< gameId.length ;i++){
        const response = await fetch("http://localhost:3001/getGameInfo?"+gameId)
        const json = await response.json()
        console.log(json)
        codeList.push(json.items[0])
        console.log({codeList})
      }
   }
  async function RecentGames(userKey) {
    await fetch("http://localhost:3001/getrecentlyplayed?"+userKey)
    .then(response => response.json())
    .then(data =>  data.response)
    .then(games => setRecentGames(games.games) )
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
        //watchVideoYoutubeUrl=""
      />
      
      {!showRecommendations && 
      <Container>
        <ThreeColumnContainer>
          <Heading>Unveil your <span tw="text-primary-500">Recomendations</span></Heading>
          <PrimaryButton onClick={()=>{
            setRecomendations();
            setShowRecommendations(true);
            }}>Click me!</PrimaryButton>
        </ThreeColumnContainer>
      </Container>}
      {showRecommendations && 
      <TabGrid
        heading={
          <>
            Check your <HighlightedText>recommendations.</HighlightedText>
          </>
        }
        cards = {yourGames}
      />}
      <Footer />
    </AnimationRevealPage>
  );
}
