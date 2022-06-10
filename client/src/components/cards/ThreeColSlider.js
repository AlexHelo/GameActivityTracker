import React, { useState } from "react";
import Slider from "react-slick";
import tw from "twin.macro";
//eslint-disable-next-line
import { css } from "styled-components/macro";
import styled from "styled-components";
import { SectionHeading } from "components/misc/Headings";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons";
import { ReactComponent as PriceIcon } from "feather-icons/dist/icons/dollar-sign.svg";
import { ReactComponent as CrosshairIcon } from "feather-icons/dist/icons/crosshair.svg";
import { ReactComponent as StarIcon } from "feather-icons/dist/icons/star.svg";
import { ReactComponent as ChevronLeftIcon } from "feather-icons/dist/icons/chevron-left.svg";
import { ReactComponent as ChevronRightIcon } from "feather-icons/dist/icons/chevron-right.svg";
import ReactModalAdapter from "../../helpers/ReactModalAdapter.js";
import ResponsiveVideoEmbed from "../../helpers/ResponsiveVideoEmbed.js";
import { ReactComponent as CloseIcon } from "feather-icons/dist/icons/x.svg";
import TabGrid from "components/cards/ThreeColSliderSongs";

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-16 lg:py-20`;

const HeadingWithControl = tw.div`flex flex-col items-center sm:items-stretch sm:flex-row justify-between`;
const Heading = tw(SectionHeading)``;
const Controls = tw.div`flex items-center`;
const ControlButton = styled(PrimaryButtonBase)`
  ${tw`mt-4 sm:mt-0 first:ml-0 ml-6 rounded-full p-2`}
  svg {
    ${tw`w-6 h-6`}
  }
`;
const PrevButton = tw(ControlButton)``;
const NextButton = tw(ControlButton)``;

const CardSlider = styled(Slider)`
  ${tw`mt-16`}
  .slick-track { 
    ${tw`flex`}
  }
  .slick-slide {
    ${tw`h-auto flex justify-center mb-1`}
  }
`;
const Card = tw.div`h-full flex! flex-col sm:border max-w-3xl sm:rounded-tl-4xl sm:rounded-br-5xl relative focus:outline-none border-solid border-primary-500 border-8`;
const CardImage = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`w-full h-56 sm:h-64 bg-cover bg-center rounded sm:rounded-none sm:rounded-tl-4xl`
]);

const TextInfo = tw.div`py-6 sm:px-10 sm:py-6`;
const TitleReviewContainer = tw.div`flex flex-col sm:flex-row sm:justify-between sm:items-center`;
const Title = tw.h5`text-2xl font-bold`;

const RatingsInfo = styled.div`
  ${tw`flex items-center sm:ml-4 mt-2 sm:mt-0`}
  svg {
    ${tw`w-6 h-6 text-yellow-500 fill-current`}
  }
`;
const Rating = tw.span`ml-2 font-bold`;

const Description = tw.p`text-sm leading-loose mt-2 sm:mt-4`;

const SecondaryInfoContainer = tw.div`flex flex-col sm:flex-row mt-2 sm:mt-4`;
const IconWithText = tw.div`flex items-center mr-6 my-2 sm:my-0`;
const IconContainer = styled.div`
  ${tw`inline-block rounded-full p-2 bg-gray-700 text-gray-100`}
  svg {
    ${tw`w-3 h-3`}
  }
`;
const Text = tw.div`ml-2 text-sm font-semibold text-white`;

const HighlightedText = tw.span`bg-purple-900 text-gray-100 px-4 transform -skew-x-12 inline-block`;

const PrimaryButton = tw(PrimaryButtonBase)`mt-auto sm:text-lg rounded-none w-full rounded sm:rounded-none sm:rounded-br-4xl py-3 sm:py-6`;

const StyledModal = styled(ReactModalAdapter)`
  &.ThreeColSliderModal__overlay {
    ${tw`fixed inset-0 min-h-screen`}
  }
  &.ThreeColSliderModal__content {
    ${tw`lg:mx-auto m-8 sm:m-8  max-w-screen-2xl min-h-screen absolute inset-0 flex justify-center items-center rounded-lg bg-graybg outline-none border-solid border-purple-900 border-8`}
  }
  .content {
    ${tw`w-full lg:p-16`}
  }
`;
const CloseModalButton = tw.button`absolute top-0 right-0 mt-8 mr-8 hocus:text-purple-700 text-purple-900`;

export default ({
  heading = "Gamers",
  cards = [
    {
      imageSrc: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=1024&w=768&q=80",
      title: "Wyatt Residency",
      description: "Lorem ipsum dolor sit amet, consectur dolori adipiscing elit, sed do eiusmod tempor nova incididunt ut labore et dolore magna aliqua.",
      genre : ["Arizona, RAK", "USD 99/Day", 4.5],
      type	: "game"
    },
    {
      imageSrc: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=1024&w=768&q=80",
      title: "Soho Paradise",
      description: "Lorem ipsum dolor sit amet, consectur dolori adipiscing elit, sed do eiusmod tempor nova incididunt ut labore et dolore magna aliqua.",
      genre : ["Arizona, RAK", "USD 99/Day", 4.5],
      type	: "game"
    },
    {
      imageSrc: "https://images.unsplash.com/photo-1549294413-26f195200c16?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=1024&w=768&q=80",
      title: "Hotel Baja",
      description: "Lorem ipsum dolor sit amet, consectur dolori adipiscing elit, sed do eiusmod tempor nova incididunt ut labore et dolore magna aliqua.",
      genre : ["Arizona, RAK", "USD 99/Day", 4.5],
      type	: "game"
    },
    {
      imageSrc: "https://images.unsplash.com/photo-1571770095004-6b61b1cf308a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=1024&w=768&q=80",
      title: "Hudak Homes",
      description: "Lorem ipsum dolor sit amet, consectur dolori adipiscing elit, sed do eiusmod tempor nova incididunt ut labore et dolore magna aliqua.",
      genre : ["Arizona, RAK", "USD 99/Day", 4.5],
      type	: "game"
    },
  ]
}) => {
  
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const toggleModal = () => setModalIsOpen(!modalIsOpen);
  // useState is used instead of useRef below because we want to re-render when sliderRef becomes available (not null)
  const [sliderRef, setSliderRef] = useState(null);
  const sliderSettings = {
    arrows: false,
    slidesToShow: 1,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 1,
        }
      },

      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
        }
      },
    ]
  };

  var [songInfo,setSongInfo] = React.useState([])
  function setModalPlaylist(type){
    songFetch(type).then((gaming)=>toggleModal())
  }

  const songFetch = async (genres) => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': 'spotify23.p.rapidapi.com',
        'X-RapidAPI-Key': '51edb9c84emsh4cc6bbbcad79edbp13549fjsnbc2447e0a80a'
      }
    }
    const url = `https://spotify23.p.rapidapi.com/search/?q=gaming%20${genres[0]}&type=playlists&offset=0&limit=2&numberOfTopResults=2`;
    const response = await fetch(url,options)
    const json = await response.json()
    //console.log(json.playlists.items[0].data.uri.split(":")[2])
    //console.log(json.playlists.items[0].data.images.items[0].sources[0].url)
    const url2 = `https://spotify23.p.rapidapi.com/search/?q=gaming%20${genres[1]}&type=playlists&offset=0&limit=2&numberOfTopResults=2`;
    const response2 = await fetch(url2,options)
    const json2 = await response2.json()

    const url3 = `https://spotify23.p.rapidapi.com/search/?q=${genres[0]}&type=playlists&offset=0&limit=2&numberOfTopResults=2`;
    const response3 = await fetch(url3,options)
    const json3 = await response3.json()
    //console.log(json.playlists.items[0])
    //console.log(json.playlists.items[0].data.images.items[0].sources[0].url)
    const url4 = `https://spotify23.p.rapidapi.com/search/?q=${genres[1]}&type=playlists&offset=0&limit=2&numberOfTopResults=2`;
    const response4 = await fetch(url4,options)
    const json4 = await response4.json()
    //console.log(json2.playlists.items)

    var songListInfo = []
    var songUri = ''
    json.playlists.items.map(song => {
      songUri = song.data.uri.split(":")[2]
      songListInfo.push({
        imageSrc: song.data.images.items[0].sources[0].url,
        title: song.data.name,
        description: song.data.description,
        genre : [genres[0],genres[1]],
        type	: 'Playlist',
        uri : 'https://open.spotify.com/playlist/' + songUri,
      })
    });
    json2.playlists.items.map(song => {
      songUri = song.data.uri.split(":")[2]
      songListInfo.push({
        imageSrc: song.data.images.items[0].sources[0].url,
        title: song.data.name,
        description: song.data.description,
        genre : [genres[0],genres[1]],
        type	: 'Playlist',
        uri : 'https://open.spotify.com/playlist/' + songUri,
      })
    });
    json3.playlists.items.map(song => {
      songUri = song.data.uri.split(":")[2]
      songListInfo.push({
        imageSrc: song.data.images.items[0].sources[0].url,
        title: song.data.name,
        description: song.data.description,
        genre : [genres[0],genres[1]],
        type	: 'Playlist',
        uri : 'https://open.spotify.com/playlist/' + songUri,
      })
    });
    json4.playlists.items.map(song => {
      songUri = song.data.uri.split(":")[2]
      songListInfo.push({
        imageSrc: song.data.images.items[0].sources[0].url,
        title: song.data.name,
        description: song.data.description,
        genre : [genres[0],genres[1]],
        type	: 'Playlist',
        uri : 'https://open.spotify.com/playlist/' + songUri,
      })
    });
    setSongInfo(songListInfo)

    return songListInfo
    

  }

  
  return (
    <>
    <Container>
      <Content>
      <StyledModal
          closeTimeoutMS={300}
          className="ThreeColSliderModal"
          isOpen={modalIsOpen}
          onRequestClose={toggleModal}
          shouldCloseOnOverlayClick={true}
        >
          <CloseModalButton onClick={toggleModal}>
            <CloseIcon tw="w-8 h-8" />
          </CloseModalButton>
          <TabGrid
            heading={
              <>
                Song <HighlightedText>recommendations.</HighlightedText>
              </>
            }
            cards = {songInfo}
          />
        </StyledModal>
        <HeadingWithControl>
          <Heading>{heading}</Heading>
          <Controls>
            <PrevButton onClick={sliderRef?.slickPrev}><ChevronLeftIcon/></PrevButton>
            <NextButton onClick={sliderRef?.slickNext}><ChevronRightIcon/></NextButton>
          </Controls>
        </HeadingWithControl>
        <CardSlider ref={setSliderRef} {...sliderSettings}>
          {cards.map((card, index) => (
            <Card key={card.title}>
              <CardImage imageSrc={card.imageSrc} />
              <TextInfo>
                <TitleReviewContainer>
                  <Title>{card.title}</Title>
                  <RatingsInfo>
                    <HighlightedText>{card.type == 'game' && 'Game'}</HighlightedText>
                  </RatingsInfo>
                </TitleReviewContainer>
                <SecondaryInfoContainer>
                {card.genre.map((genre, index) => (
                  <IconWithText>
                    <IconContainer>
                      <CrosshairIcon />
                    </IconContainer>
                    <Text>{genre}</Text>
                  </IconWithText>
                  ))}
                </SecondaryInfoContainer>
                <Description>{card.description}</Description>
              </TextInfo>
              <PrimaryButton onClick={()=>{setModalPlaylist(card.genre)}} id={index}
                >Recommendation {card.title}</PrimaryButton>
            </Card>
          ))}
        </CardSlider>
        
      </Content>
    </Container>
    </>
  );
};
