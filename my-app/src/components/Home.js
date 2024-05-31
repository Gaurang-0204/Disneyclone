import styled from "styled-components";
import ImgSlider from "./ImgSlider";
import NewDisney from "./NewDisney";
import Originals from "./Originals";
import Recommends from "./Recommends";
import Trending from "./Trending";
import Viewers from "./Viewers";
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import db from "../firebase";
import { setMovies } from "../features/movie/movieSlice";
import { selectUserName } from "../features/user/userSlice";
import { collection,getDocs } from "firebase/firestore";


const Home = (props) => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);

  // Use state to manage the arrays
  const [recommends, setRecommends] = useState([]);
  const [newDisneys, setNewDisneys] = useState([]);
  const [originals, setOriginals] = useState([]);
  const [trending, setTrending] = useState([]);
  const clubCollectionRef = collection(db, 'movies');

  useEffect(() => {
    console.log("hello");

    // Fetch data from Firebase
    const fetchData = async () => {
      const snapshot = await getDocs(clubCollectionRef);
      // Initialize arrays
      let recommendArray = [];
      let newDisneyArray = [];
      let originalArray = [];
      let trendingArray = [];

      snapshot.docs.forEach((doc) => {
        switch (doc.data().type) {
          case "recommend":
            recommendArray = [...recommendArray, { id: doc.id, ...doc.data() }];
            break;

          case "new":
            newDisneyArray = [...newDisneyArray, { id: doc.id, ...doc.data() }];
            break;

          case "original":
            originalArray = [...originalArray, { id: doc.id, ...doc.data() }];
            break;

          case "trending":
            trendingArray = [...trendingArray, { id: doc.id, ...doc.data() }];
            break;
        }
      });

      // Set state with the populated arrays
      setRecommends(recommendArray);
      setNewDisneys(newDisneyArray);
      setOriginals(originalArray);
      setTrending(trendingArray);

      // Dispatch action to store data in Redux
      dispatch(
        setMovies({
          recommend: recommendArray,
          newDisney: newDisneyArray,
          original: originalArray,
          trending: trendingArray,
        })
      );
    };

    // Call the fetchData function
    fetchData();
  }, [dispatch, userName]);


  return (
    <Container>
      <ImgSlider />
      <Viewers />
      <Recommends />
      <NewDisney />
      <Originals />
      <Trending />
    </Container>
  );
};

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

export default Home;