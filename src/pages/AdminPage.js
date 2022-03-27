import React, { useState, useEffect } from "react";
import { BsFillPencilFill, BsTrash } from "react-icons/bs";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import illustration from "images/login-illustration.png";
import logo from "images/logo.png";
import googleIconImageSrc from "images/google-icon.png";
import twitterIconImageSrc from "images/twitter-icon.png";
import { ReactComponent as LoginIcon } from "feather-icons/dist/icons/log-in.svg";
import AddModal from "../components/AddModal";
import EditModal from "../components/EditModal";
import Axios from "axios";

import {
  Table,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroupm,
  ModalFooter,
  FormGroup,
} from "reactstrap";

const Container = tw(
  ContainerBase
)`min-h-screen bg-primary-900 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`min-w-full sm:my-16 bg-gray-900 text-white shadow justify-center flex-1 `;
const MainContainer = tw.div`lg:w-1/2 min-w-full p-6 flex`;
const TableContainer = tw.div`justify-center`;
const LogoLink = tw.a``;
const LogoImage = tw.img`h-12 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center flex`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold text-white`;
const FormContainer = tw.div`w-full flex-1 mt-8`;

const DividerTextContainer = tw.div`my-12 border-b text-center relative`;
const DividerText = tw.div`leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform -translate-y-1/2 absolute inset-x-0 top-1/2 bg-transparent`;

const Form = tw.form`mx-auto max-w-xs`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm text-gray-600 focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-white flex-1 h-3 w-48 border-b border-gray-500
   origin-center py-5 rounded-full hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center 
   justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-8 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;

const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 text-center hidden lg:flex justify-center w-full`;
const IllustrationImage = styled.div`
  ${(props) => `background-image: url("${props.imageSrc}");`}
  ${tw`m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat`}
`;

//-----------------------------------//
// id, name, password, level, email. //
//-----------------------------------//

const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;
function AdminPage() {
  const initialState = [
    {
      id: 1,
      name: "Jose",
      lastname: "Berron",
      email: "a@gmail.com",
      admin: true,
      language: "ES",
    },
    {
      id: 2,
      name: "Aldo",
      lastname: "Ponce",
      email: "b@gmail.com",
      admin: false,
      language: "EN",
    },
  ];
  const [data, setData] = useState(initialState);
  // Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [item, setItem] = useState({});

  const insertFn = () => {
    setShowAddModal(!showAddModal);
  };
  const editFn = (item) => {
    setShowEditModal(true);
    setItem(item);
  };
  const deleteFn = (id) => {
    let opcion = window.confirm("Are you sure you want to delete" + id);
    if (opcion == true) {
      Axios.delete(`http://localhost:3001/delete/${id}`);
    }
  };
  const restartFn = () => {
    setData(initialState);
  };

  const defaultLogoLink = (
    <LogoLink href="/">
      <img src={logo} alt="logo" />
      Gamechord
    </LogoLink>
  );

  useEffect(() => {
    Axios.get("http://localhost:3001/admin-query").then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <AnimationRevealPage>
      <Container>
        <Content>
          <MainContent>
            <Heading>{<>{defaultLogoLink}</>}</Heading>
          </MainContent>
          <MainContainer>
            <br></br>
            <br></br>
            <SubmitButton color="primary" className="m-2" onClick={insertFn}>
              Insert New User
            </SubmitButton>
            <br></br>
          </MainContainer>
          <TableContainer></TableContainer>
          <Table responsive dark>
            <thead>
              <tr>
                <th>id</th>
                <th>name</th>
                <th>level</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item.name}</td>
                  <td>{item.level}</td>
                  <td>
                    <SubmitButton color="warning" onClick={() => editFn(item)}>
                      <BsFillPencilFill />
                    </SubmitButton>{" "}
                    <SubmitButton
                      color="danger"
                      onClick={() => deleteFn(item._id)}
                    >
                      <BsTrash />
                    </SubmitButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Content>
      </Container>
      <AddModal
        showAddModal={showAddModal}
        setShowAddModal={setShowAddModal}
        setData={setData}
        data={data}
      />
      <EditModal
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        setData={setData}
        data={data}
        item={item}
        setItem={setItem}
      />
    </AnimationRevealPage>
  );
}

export default AdminPage;
