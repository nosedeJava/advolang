import React, { useEffect } from 'react';
import { Grid, Box, Typography, Button, Avatar, Divider, ButtonBase } from '@material-ui/core';
import HoverRating from './RatingRecommendation';
import FormDialog from './ReportDialog';
import ListCategories from '../recommendationComponent/ListCategories';
import {ResourceController} from './ResourceController.js';
import './SpecificRecommendation.css';
import {calcProm, calculatePublication, getRecommendationScores, getRecommendationScoreColor, getFirstVoting, setUserVote, addScore} from '../Auxiliar/AuxiliarTools.js';
import {savedRecommendationsList} from '../Auxiliar/Data.js';
import {CheckValidYoutubeURL, CheckMimeType} from '../Auxiliar/CheckMedia.js';
import {ShowSuccessMessage, ShowWarningMessage} from '../Auxiliar/Swal.js';
import { useHistory } from "react-router-dom";
import {componentDidMountGet, componentDidMountPost} from '../Auxiliar/Petitions.js';
import {getLocalStorageObject} from '../Auxiliar/ObjectTools.js';


function SpecificRecommendation() {

  let history = useHistory();
  let current_id=localStorage.getItem('recommendation-id');
  /* (valor prev antes de base de datos) Id del usuario de la sesión*/
  let sessionUserId = getLocalStorageObject('user').id;

  /* Carga de respuestas*/
  const [loadingCurrentRecom, setLoadingCurrentRecom] = React.useState(true);
  const [loadingScorePost, setLoadingScorePost] = React.useState(false);

  /* */
  const [currentRecom, setCurrentRecom] = React.useState({});
  const [totalScore, setTotalScore] = React.useState(calcProm(getRecommendationScores(current_id)));
  const [firstVoting, setFirstVoting] = React.useState(true);

  useEffect(() => {
      componentDidMountGet(setLoadingCurrentRecom, setCurrentRecom, '/api/recommendations/' + current_id);
      window.scrollTo(0, 0);
  }, []);



  let colorScore = getRecommendationScoreColor(totalScore);

  const afterScorePost = () => {
    alert("Successfully score post")
  }

  const handleRating = (value) =>{

    if(firstVoting){
      setFirstVoting(false);
      addScore(sessionUserId, current_id, value);
      let newScore = {
        userId : getLocalStorageObject('user').type,
        recommendationId : current_id,
        value : value
      }

      componentDidMountPost(setLoadingScorePost, afterScorePost, '/api/scores/add', newScore)

    }
    else{
      setUserVote(sessionUserId, current_id, value);
    }

    setTotalScore(calcProm(getRecommendationScores(current_id)));
    /*Cambiar valores en la bd*/

  }
  function callback(bool){
    alert(bool)
    //continúa
  }

  const handleSave = () =>{

    let existingSavedRecom = savedRecommendationsList.filter(recom => recom.id === currentRecom.id);

    if(existingSavedRecom.length !== 0){
      ShowWarningMessage("Warning", "This recommendation is already saved")
          .then(() => console.log("Done"))
    }
    else{
      savedRecommendationsList.push(currentRecom)
      ShowSuccessMessage("Awesome", "Recommendation successfully saved")
          .then(() => console.log("Done"))
    }
  }

  const handleSpecificUser = () => {
    history.push("/specific-user")
    //redirigir a specific user

  }

  const typesRec = () =>{
    alert(CheckMimeType("PP.txt"))
    CheckValidYoutubeURL("https://www.youtube.com/watch?v=BjC0KUxiMhc", callback);
  }

  if (loadingCurrentRecom) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="specificRecommendationDiv">
      {alert(JSON.stringify(currentRecom))}
      <Grid container id="specificRecommendation" className="specificRecommendationGrid" spacing={0} direction="row" >
        <Grid item className="gridPostContainer">
          <Box boxShadow={3} borderRadius="borderRadius" className="postBoxClass" >

            <Grid container className="headerRecomGrid" >

              {/* Uso de la imagen relacionada a la recomendación. */}
              <Grid item className="imageRecomGrid">
                <div className="imageRecomDiv">
                  <Avatar variant="square" alt="Remy Sharp" src={currentRecom.thumbnail} style={{ height: 'auto', width: 'auto', backgroundColor: "white" }} />
                </div>
              </Grid>

              <Grid item className="infoRecomGrid">
                <Grid container className="infoRecomGridContainer">

                  {/*Uso del titulo de la recomendación. */}
                  <Grid item className="recomTitleGrid">
                    <Box className="recomTitleBox">
                      {currentRecom.title}
                    </Box>
                  </Grid>

                  {/* Uso de la fecha de publicación. */}


                    <Grid item className="recomDateGrid">
                      <Box className="recomDateBox">
                      </Box>
                    </Grid>

                    {/* Rating de la publicación. */}
                    <Grid item className="recomRaitingItemGrid">

                      <Grid container className="recomRaitingItemContainer" >

                        <Grid item >
                          <Box className="ratingGrid">
                            <HoverRating className="hooverRating" startValues={totalScore} selectedMatch={handleRating} />
                          </Box>
                        </Grid>

                        {/* Uso del score asociado a la recomendación. */}
                        <Grid item className="recomScoreGrid">
                          <Box borderRadius="50%" className="scoreBox" style={{ backgroundColor: colorScore }}>
                            <Typography className="scoreFont" >
                              {totalScore}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                  </Grid>
                </Grid>
              </Grid>
              {/* Uso de la descripción dada a una recomendación en especifico. */}
              <Grid item className="recomDescription">
                <Box borderRadius="borderRadius" className="descripBoxClass">
                  {currentRecom.description}
                </Box>
              </Grid>
            </Grid>

            {/* Uso del enlace relacionado a la recomendación.*/}
            <Grid item className="recomRecourseGrid">
              <Box className="recomRecourseBox" align="center">
                <ResourceController resource={currentRecom.resource}/>
              </Box>

            </Grid>

            <Grid item >
              <Box className="footerPostBox" >
                <Grid container className="footerPostContainer" direction="row" spacing={1}>
                  <Grid item>
                    <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
                  </Grid>

                  <Grid item>
                    <FormDialog />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={4} direction="row" className="gridUserContainerMain">
          <Grid container spacing={0} direction="column" className="gridUserContainer">
            <Grid item className="userFirstGrid">
              <ButtonBase className="specificUserButtonBase" onClick={handleSpecificUser}>
                <Box boxShadow={3} borderRadius="borderRadius" className="userConatainerBox" >
                  <Grid container className="usersSubContainer" spacing={0} direction="column">

                    {/* Aquí uso el nombre de usuario y el enlace a la imagen de perfil.*/}
                    <Grid item className="userProfileGrid">
                      <div className="userImageDiv">
                        <Avatar variant="square" alt="Stinky" src={currentRecom.creator.userImage} style={{ height: '100%', width: '100%' }} />
                      </div>
                    </Grid>

                    {/* Aquí uso el nombre de usuario*/}
                    <Grid item className="userNameGrid">
                      <Box className="userNameBox">
                        {currentRecom.creator.username}
                      </Box>
                    </Grid>

                    <Divider className="divider" variant="middle"  />

                    {/*Descripción del usuario.*/}
                    <Grid className="userDescGrid">
                      <Box className="userDescBox">
                        {currentRecom.creator.description}
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </ButtonBase>
            </Grid>

            {/* Uso de las categorias asociadas a la recomendación.*/}
            <Grid item className="categoriesGrid">
              <Box className="categoriesBox">
                {/*<ListCategories  content={currentRecom.categories} />*/}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default SpecificRecommendation;
