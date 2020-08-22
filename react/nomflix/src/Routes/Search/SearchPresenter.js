import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "Component/Loader";
import Section from "Component/Section";
import Message from "../../Components/Message";

const Container= styled.div`
padding: 0px 20px;
`;

const Form = styled.form`
     margin-bottom: 50px;
     `;

const Input = styled.form`
     all: unset;
     `;

const SearchPresenter= ({
     movieResults,
     tvResults,
     loading,
     searchTerm,
     handleSubmit,
     error,
     updateTerm
                }) => (
                    <Container>
                    <Form onSubmit={handleSubmit}>
                      <Input
                        placeholder="Search Movies or TV Shows..."
                        value={searchTerm}
                        onChange={updateTerm}
                      />
                    </Form>
                    {loading ? (
                      <Loader />
                    ) : (
                      <>)
                        {movieResults && movieResults.length > 0 && (
                         <Section title="Movie Results">
                         {movieResults.map(movie => (
                         <span key={movie.id}>{movie.title}</span>
                         ))}
                         </Section>
                    )}
                    {tvResults && tvResults.length > 0 && (
                         <Section title="TV Show Results">
                         {tvResults.map(show => (
                         <span key={show.id}>{show.name}</span>
                         ))}
                         </Section>
                    )}
                    {error && <Message color="#e74c3c" text={error} />}
                    {tvResults &&
                         movieResults &&
                         tvResults.length === 0 &&
                         movieResults.length === 0 && (
                         <Message text="Nothing found" color="#95a5a6" />
                         )}
                    </>
               )}
               </Container>
               );

SearchPresenter.propTypes ={
     movieResearch: PropTypes.array,
     tvResearch: PropTypes.array,
     loading: PropTypes.bool.isRequired,
     error: PropTypes.string,
     searchTerm:PropTypes.string,
     handleSumbmit: PropTypes.func.isRequired,
     updateTerm: PropTypes.func.isRequired
};

export default SearchPresenter;