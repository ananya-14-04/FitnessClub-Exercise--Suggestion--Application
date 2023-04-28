import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import { exerciseOptions, fetchData, youtubeOptions } from '../utils/fetchData';
import Detail from '../components/Detail';
import ExerciseVideos from '../components/ExerciseVideos';
import SimilarExercises from '../components/SimilarExercises';

const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState({});
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
  const [equipmentExercises, setEquipmentExercises] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    //original
    const fetchExercisesData = async () => {
      const exerciseDbUrl = 'https://exercisedb.p.rapidapi.com';
      const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com';

      const exerciseDetailData = await fetchData(`${exerciseDbUrl}/exercises/exercise/${id}`, exerciseOptions);
      setExerciseDetail(exerciseDetailData);

      const exerciseVideosData = await fetchData(`${youtubeSearchUrl}/search?query=${exerciseDetailData.name} exercise`, youtubeOptions);
      setExerciseVideos(exerciseVideosData.contents);

      const targetMuscleExercisesData = await fetchData(`${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`, exerciseOptions);
      setTargetMuscleExercises(targetMuscleExercisesData);

      const equimentExercisesData = await fetchData(`${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}`, exerciseOptions);
      setEquipmentExercises(equimentExercisesData);
    };

    //working : debugged

    // const fetchExercisesData = async () => {
    //   try {
    //     const exerciseDbUrl = 'https://exercisedb.p.rapidapi.com';
    //     const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com';

    //     const exerciseDetailData = await fetchData('${exerciseDbUrl}/exercises/exercise/${id}', exerciseOptions);
    //     setExerciseDetail(exerciseDetailData);

    //     const exerciseVideosData = await fetchData('${youtubeSearchUrl}/search?query=${exerciseDetailData.name} exercise', youtubeOptions);
    //     setExerciseVideos(exerciseVideosData.contents);

    //     const targetMuscleExercisesData = await fetchData('${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}', exerciseOptions);
    //     setTargetMuscleExercises(targetMuscleExercisesData);

    //     const equimentExercisesData = await fetchData('${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}', exerciseOptions);
    //     setEquipmentExercises(equimentExercisesData);
    //   } catch (error) {
    //     console.error(error);
    //     // handle the error here (show error message to the user)
    //   }
    // };

    //testing
    // const fetchExercisesData = async (id) => {
    //   try {
    //     const exerciseDbUrl = 'https://exercisedb.p.rapidapi.com';
    //     const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com';

    //     const exerciseOptions = {
    //       headers: {
    //         'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
    //         // 'x-rapidapi-key': 'your-api-key-here'
    //         'x-rapidapi-key': 'c231d7d4cfmsh92a756992e9ca99p18d303jsn8a31fedb8dbc'
    //       }
    //     };

    //     const youtubeOptions = {
    //       headers: {
    //         'x-rapidapi-host': 'youtube-search-and-download.p.rapidapi.com',
    //         'x-rapidapi-key': 'c231d7d4cfmsh92a756992e9ca99p18d303jsn8a31fedb8dbc'
    //       }
    //     };

    //     const exerciseDetailData = await fetchData('${exerciseDbUrl}/exercises/exercise/${id}', exerciseOptions);
    //     const exerciseVideosData = await fetchData('${youtubeSearchUrl}/search?query=${exerciseDetailData.name} exercise', youtubeOptions);
    //     const targetMuscleExercisesData = await fetchData('${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}', exerciseOptions);
    //     const equipmentExercisesData = await fetchData('${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}', exerciseOptions);

    //     setExerciseDetail(exerciseDetailData);
    //     setExerciseVideos(exerciseVideosData.contents);
    //     setTargetMuscleExercises(targetMuscleExercisesData);
    //     setEquipmentExercises(equipmentExercisesData);
    //   } catch (error) {
    //     console.error(error);
    //     // handle the error here (show error message to the user)
    //   }
    // };


    fetchExercisesData();
  }, [id]);

  if (!exerciseDetail) return <div>No Data</div>;

  return (
    <Box sx={{ mt: { lg: '96px', xs: '60px' } }}>
      <Detail exerciseDetail={exerciseDetail} />
      <ExerciseVideos exerciseVideos={exerciseVideos} name={exerciseDetail.name} />
      <SimilarExercises targetMuscleExercises={targetMuscleExercises} equipmentExercises={equipmentExercises} />
    </Box>
  );
};

export default ExerciseDetail;