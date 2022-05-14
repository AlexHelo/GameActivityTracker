import React, { useState } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import {css} from "styled-components/macro"; //eslint-disable-line
import illustration from "images/login-illustration.png";
import logo from "images/logo.png";
//import googleIconImageSrc from "images/google-icon.png";
//import twitterIconImageSrc from "images/twitter-icon.png";
import steamIconImageSrc from "images/Steam_icon.png";
import spotifyIconImageSrc from "images/Spotify_icon.png";
import { ReactComponent as LoginIcon } from "feather-icons/dist/icons/log-in.svg";
import jwt from "jsonwebtoken";


const Container = tw(ContainerBase)`min-h-screen bg-primary-900 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-gray-900 text-white shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const LogoLink = tw.a``;
const LogoImage = tw.img`h-12 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold text-white`;
const FormContainer = tw.div`w-full flex-1 mt-8`;

const SocialButtonsContainer = tw.div`flex flex-col items-center`;
const SocialButton = styled.a`
  ${tw`w-full max-w-xs font-semibold rounded-lg py-3 bg-primary-500 text-gray-100 hocus:bg-primary-500 hocus:bg-primary-500 flex items-center justify-center transition-all duration-300 focus:outline-none focus:shadow-outline text-sm mt-5 first:mt-0`}
  .iconContainer {
    ${tw`bg-primary-500 p-2 rounded-full`}
  }
  .icon {
    ${tw`w-6`}
  }
  .text {
    ${tw`ml-4`}
  }
`;

const DividerTextContainer = tw.div`my-12 border-b text-center relative`;
const DividerText = tw.div`leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform -translate-y-1/2 absolute inset-x-0 top-1/2 bg-transparent`;

const Form = tw.form`mx-auto max-w-xs`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm text-gray-600 focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;
const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 text-center hidden lg:flex justify-center w-full`;
const IllustrationImage = styled.div`
  ${props => `background-image: url("${props.imageSrc}");`}
  ${tw`m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat`}
`;
const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;

export default function Login ({
  logoLinkUrl = "/",
  illustrationImageSrc = illustration,
  headingText = "",
  socialButtons = [
    {
      iconImageSrc: steamIconImageSrc,
      text: "Sign In With Steam",
      url: "http://localhost:3001/auth/steam/"
    },
    {
      iconImageSrc: spotifyIconImageSrc,
      text: "Sign In With Spotify",
      url: "http://localhost:3001/auth/spotify/"
    }
  ],
  submitButtonText = "Sign In",
  SubmitButtonIcon = LoginIcon,
  forgotPasswordUrl = "#",
  signupUrl = "/Signup",

  

}) {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

	async function loginUser(event) {
		event.preventDefault()

		const response = await fetch('http://localhost:3001/user-login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
			}),SubmitButton
		})

		const data = await response.json()


		if (data.user) {
			localStorage.setItem('token', data.user)
			alert('Login successful')


      //TODO add query to verify in the backend, never expose tokens
      const decoded = jwt.verify(data.user, 'KVwL2amj9C');

      // decoded jwt with unsafe frontend token
      const email = decoded.email
      const test = JSON.stringify({
        email
      })

      const APIresponse = await fetch('http://localhost:3001/hasAPI', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email
        })
      })

      // Reponse from API. Checks if API tokens are linked or not. error if not linked, OK if linked
      const APIdata = await APIresponse.json()


      if (APIdata.status == "error"){
        window.location.href = '/ConnectionRequired'
      }
      else if (APIdata.status == "OK"){
        window.location.href = '/dashboard'
      } else {
        window.location.href = '/ERROR'
      }
     
		} else {
			alert('Please check your username and password')
		}
	}

return (
  <AnimationRevealPage>
    <Container>
      <Content>
        <MainContainer>
          <LogoLink href={logoLinkUrl}>
            <LogoImage src={logo} />
          </LogoLink>
          <MainContent>
            <Heading>{<>Sign In To <HighlightedText>GameChord</HighlightedText></>}</Heading>
            <FormContainer>
              <Form onSubmit={loginUser}>
                <Input type="email"  placeholder="Email"
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }} />
                <Input type="password" placeholder="Password" onChange={(event) => {
                  setPassword(event.target.value);
                }}/>
                <SubmitButton type="submit">
                  <SubmitButtonIcon className="icon" />
                  <span className="text">{submitButtonText}</span>
                </SubmitButton>
              </Form>
              <p tw="mt-6 text-xs text-gray-600 text-center">
              </p>
              <p tw="mt-8 text-sm text-gray-600 text-center">
                Dont have an account?{" "}
                <a href={signupUrl} tw="border-b border-gray-500 border-dotted">
                  <HighlightedText>Sign Up</HighlightedText>
                </a>
                <br></br>
              </p>
            </FormContainer>
          </MainContent>
        </MainContainer>
        <IllustrationContainer>
          <IllustrationImage imageSrc={illustrationImageSrc} />
        </IllustrationContainer>
      </Content>
    </Container>
  </AnimationRevealPage>
);
}
