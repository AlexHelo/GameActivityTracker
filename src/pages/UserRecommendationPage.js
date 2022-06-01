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

const PrimaryButton = tw(PrimaryButtonBase)`px-24 py-10 mt-20 md:mt-10 text-6xl inline-block mx-auto md:mx-0`;

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
  
  //var [yourGames,setYourGames] = React.useState([])

  var [showRecommendations, setShowRecommendations] = React.useState(false)
  
  
  function setRecomendations(){
    //RecentGames(userId).then((gamesinfo)=>AddYourGames(gamesinfo))
    yourRecentGames(userId).then((id)=>infoGames(id)).then((games)=>{
      console.log(games)
      AddYourGames(games)
      setShowRecommendations(true);
    })
    //infoGames([569480,1905180])
  }
  const yourRecentGames = async (userId) => {
    let codeList=[]
    //console.log(userId)
    const response = await fetch("http://localhost:3001/getrecentlyplayed?"+userId)
    const json = await response.json()
    //console.log(json.response.games,json.response.games.length)
    for(var i = 0; i < json.response.games.length; i++){
        codeList.push(json.response.games[i].appid)
    }
    //console.log({codeList})
    return codeList;
   }
  const infoGames = async (gameId) => {
    let codeList=[]
    //console.log(gameId,gameId.length)
    for(var i = 0; i < gameId.length; i++){
        const response = await fetch("http://localhost:3001/getGameInfo?"+gameId[i])
        const json = await response.json()
        //console.log(json)
        codeList.push(json[gameId[i]].data)
        //console.log({codeList})
      }
    return codeList;
   }
  function AddYourGames(info){
    var gamesListInfo = []
    info.map(game => {
      //console.log(game.categories)
      gamesListInfo.push({
        imageSrc: game.header_image,
        title: game.name,
        description: game.short_description,
        genre : [game.genres[0].description,game.genres[1].description],
        type	: game.type})
    });
    //console.log(gamesListInfo)
    setGamesInfo(gamesListInfo)
    
  }

  return (
    <AnimationRevealPage>
      <Hero
        //watchVideoYoutubeUrl=""
      />
      
      {!showRecommendations && 
      <Container>
        <ThreeColumnContainer>
          <Heading>Unveil your <span tw="text-purple-700">Recomendations</span></Heading>
          <PrimaryButton onClick={()=>{
            setRecomendations();
            }}>Click me!</PrimaryButton>
        </ThreeColumnContainer>
      </Container>}
      {showRecommendations && 
      <TabGrid
        heading={
          <>
            Check your Recent <HighlightedText>Games</HighlightedText>
          </>
        }
        cards = {gamesInfo}
      />}
      <Footer />
    </AnimationRevealPage>
  );
}
