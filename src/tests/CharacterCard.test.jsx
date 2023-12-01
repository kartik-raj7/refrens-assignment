import React from "react";
import { render, screen } from "@testing-library/react";
import CharacterCard from "../components/common/CharacterCard";
import { BrowserRouter } from "react-router-dom";
import "./matchmedia";
test("renders CharacterCard with expected content", () => {
  const data = {
    id: 21,
    name: "Aqua Morty",
    status: "unknown",
    species: "Humanoid",
    type: "Fish-Person",
    gender: "Male",
    origin: {
      name: "unknown",
      url: "",
    },
    location: {
      name: "Citadel of Ricks",
      url: "https://rickandmortyapi.com/api/location/3",
    },
    image: "https://rickandmortyapi.com/api/character/avatar/21.jpeg",
    episode: [
      "https://rickandmortyapi.com/api/episode/10",
      "https://rickandmortyapi.com/api/episode/22",
    ],
    url: "https://rickandmortyapi.com/api/character/21",
    created: "2017-11-04T22:39:48.055Z",
  };

  render(
    <BrowserRouter>
      <CharacterCard data={data} />
    </BrowserRouter>,
  );

  // Use a more specific query related to the content of the CharacterCard
  const characterNameElement = screen.getByText(/Aqua Morty/i);
  const genderNameElement = screen.getByText(/Male/i);
  const speciesNameElement = screen.getByText(/Humanoid/i);
  const statusNameElement = screen.getByText(/unknown/i);
  // Check if specific elements are present in the rendered CharacterCard
  expect(characterNameElement).toBeInTheDocument();
  expect(genderNameElement).toBeInTheDocument();
  expect(speciesNameElement).toBeInTheDocument();
  expect(statusNameElement).toBeInTheDocument();
});
