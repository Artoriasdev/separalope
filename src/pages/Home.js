import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setShowBack, setAppSlice } from "../slices/AppSlice";
import { getValidIndex } from "../helpers/utilitaires";
import classnames from "classnames";
import FlipComponent from "../components/Flip";
import SearchBar from "material-ui-search-bar";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

import FetchUrl from "../helpers/fetch";
import {
  StretchSVG,
  WeightSVG,
  CookSVG,
  ZoomSVG,
  ArrowCircleSVG,
  ArrowBlackCircleSVG,
  BulbSVG,
} from "../assets/images/svg";
import {
  StyledImg,
  StyledDiv,
  StyledFigure,
  StyledTitle,
  StyledSubTitle,
  StyledContainer,
  StyledSpan,
  StyledLink,
} from "../helpers/styled";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    borderRadius: "25px",
    "& .MuiSvgIcon-root": {
      color: "#5829dd",
    },
  },
}));

const styles = {
  root: {
    width: "300px", // max size card
    // marginLeft: '5vw',
    overflowX: "initial", //show sides
  },
  slideContainer: {
    overflow: "initial",
  },
  slide: {
    width: "80%",
    margin: "auto",
    padding: 15,
    minHeight: 100,
    color: "#fff",
    opacity: 0.5,
    backgroundColor: "#232323",
    overflow: "hidden",
    borderRadius: "4px",
  },
  selected: {
    opacity: 1,
  },
};
const HomePage = () => {
  const { searchCategories, data } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const [homeBanner, setHomeBanner] = useState([]);
  const [homeAds, setHomeAds] = useState([]);
  const [serviceText, setServiceText] = useState("");

  const [swipeIndex, setSwipeIndex] = useState(0);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [search, setSearch] = useState("");

  const handleOnSwipeCarousel = (index) => {
    setSwipeIndex(index);
  };
  const handleOnClickCarousel = (index) => {
    setSwipeIndex(index);
  };
  const handleOnMoveCarousel = ({ direction = true }) => {
    const { length } = homeBanner;
    const nextIndex = getValidIndex(swipeIndex, length, direction);
    return setSwipeIndex(nextIndex);
  };

  const handleOnSwipeCategory = (index) => {
    setCategoryIndex(index);
  };

  const handleOnMoveCategory = ({ direction = true }) => {
    const { length } = searchCategories;
    const nextIndex = getValidIndex(categoryIndex, length, direction);
    return setCategoryIndex(nextIndex);
  };

  const SearchCategory = async ({ clear = false }) => {
    try {
      const fetchCategoriesPayload = `
          query {
            categories (filter: "${clear ? "" : search}") {
              _id
              name
              description
              image
              tip
              subCategories {
                _id
                name
                image
                description
              }
            }
          }`;
      const categoriesFound = await FetchUrl({
        payload: fetchCategoriesPayload,
        name: "categories",
      });

      dispatch(
        setAppSlice({
          searchCategories: categoriesFound,
        })
      );
      return setCategoryIndex(0);
    } catch (err) {
      console.error(err, "Fetch categories");
      dispatch(
        setAppSlice({
          error: true,
          modalMessage: err.message,
          modalOpen: true,
        })
      );
    }
  };

  useEffect(() => {
    const manageShowBack = async () => {
      dispatch(setShowBack({ showBack: false }));
    };
    manageShowBack();
    return () => {
      dispatch(setShowBack({ showBack: true }));
    };
  }, [dispatch]);

  useEffect(() => {
    const {
      disclaimers: { homeServiceText },
      homeBanner,
      homeAds,
    } = data;
    setServiceText(homeServiceText);
    setHomeBanner(homeBanner);
    setHomeAds(homeAds);
  }, [data]);

  return (
    <>
      <StyledDiv className="slideshow">
        <AutoPlaySwipeableViews
          className="h-100"
          slideClassName="h-100 p-r"
          index={swipeIndex}
          interval={12000}
          onChangeIndex={handleOnSwipeCarousel}
        >
          {homeBanner.map(
            (
              {
                _id,
                url,
                content: {
                  title,
                  info,
                  link: [linkF, linkS, linkT],
                  subtitle: [subF, subS],
                },
              },
              index
            ) => (
              <>
                <StyledDiv className="image--container" key={_id}>
                  <StyledDiv
                    className={classnames("slide-content", {
                      active: swipeIndex === index,
                    })}
                  >
                    <StyledDiv className="caption" flex center jcenter fwrap>
                      <StyledDiv className="big" mh="1rem">
                        <StyledDiv className="title">{title}</StyledDiv>
                        <StyledDiv className="subtitle">
                          {subF}
                          <StyledSpan className="primary">{subS}</StyledSpan>
                        </StyledDiv>
                      </StyledDiv>
                      <StyledDiv className="info" mh="1rem">
                        <StyledDiv className="text">{info}</StyledDiv>
                        <StyledDiv className="text">
                          <p>
                            {linkF}
                            <StyledLink
                              onClick={() => history.push(linkT)}
                              className="link"
                            >
                              {linkS}
                            </StyledLink>
                          </p>
                        </StyledDiv>
                      </StyledDiv>
                    </StyledDiv>
                  </StyledDiv>
                  <StyledImg
                    className="image"
                    src={url}
                    alt={`homeBanner${index}`}
                  />
                </StyledDiv>
              </>
            )
          )}
        </AutoPlaySwipeableViews>
        {swipeIndex !== 0 && (
          <StyledDiv
            showAtMobileUI
            position="absolute"
            left="10px"
            top="calc(50% - 18px)"
          >
            <StyledFigure
              pointer
              flex
              center
              w="36px"
              h="36px"
              onClick={handleOnMoveCarousel.bind(this, { direction: false })}
            >
              <ArrowBlackCircleSVG />
            </StyledFigure>
          </StyledDiv>
        )}
        {swipeIndex !== homeBanner.length - 1 && (
          <StyledDiv
            showAtMobileUI
            position="absolute"
            right="10px"
            top="calc(50% - 18px)"
          >
            <StyledFigure
              pointer
              flex
              center
              w="36px"
              h="36px"
              onClick={handleOnMoveCarousel.bind(this, { direction: true })}
            >
              <ArrowBlackCircleSVG side={false} />
            </StyledFigure>
          </StyledDiv>
        )}
        <StyledDiv
          position="absolute"
          bottom="0"
          right={`calc(50% - ${15 * homeBanner.length}px)`}
        >
          <StyledDiv className={classnames("dots")}>
            {homeBanner.map((_, index) => (
              <StyledDiv
                onClick={handleOnClickCarousel.bind(this, index)}
                key={`${index}dots`}
                className={classnames("dots__bullet", {
                  "dots__bullet--selected": index === swipeIndex,
                })}
              />
            ))}
          </StyledDiv>
        </StyledDiv>
      </StyledDiv>

      <StyledContainer flex col>
        <StyledDiv flex center between ph="1rem" mt="2rem">
          <StyledDiv flex center>
            <StyledFigure flex center w="46px">
              <StretchSVG />
            </StyledFigure>
            <StyledFigure flex center w="46px">
              <WeightSVG />
            </StyledFigure>
            <StyledFigure flex center w="46px">
              <CookSVG />
            </StyledFigure>
          </StyledDiv>
          <StyledFigure flex center w="50px" h="50px">
            <ZoomSVG />
          </StyledFigure>
        </StyledDiv>
        <StyledDiv flex center between fwrap ph="1rem" className="searchDiv">
          <StyledDiv flex col w="50%">
            <StyledTitle color="#5829dd">Nuestras Categorias</StyledTitle>
            <StyledSubTitle color="rgba(0,0,0,0.4)">
              {serviceText}
            </StyledSubTitle>
          </StyledDiv>
          <StyledDiv mt="1.5rem">
            <SearchBar
              classes={{ root: classes.root }}
              placeholder="Ingresa nombre"
              value={search}
              onCancelSearch={SearchCategory.bind(this, { clear: true })}
              onChange={(newValue) => setSearch(newValue)}
              onRequestSearch={SearchCategory}
            />
          </StyledDiv>
        </StyledDiv>
        <StyledDiv
          position="relative"
          overflow="hidden"
          pv="2rem"
          mb="8rem"
          mt="1rem"
        >
          <SwipeableViews
            index={categoryIndex}
            onChangeIndex={handleOnSwipeCategory}
            style={styles.root}
            slideStyle={styles.slideContainer}
          >
            {searchCategories.map(
              ({ _id, name, description, tip, image }, index) => (
                <StyledDiv key={_id} onClick={() => setCategoryIndex(index)}>
                  <FlipComponent
                    styledbg={image}
                    selected={categoryIndex === index}
                    manual={categoryIndex !== index}
                    height={270}
                    width={300}
                    margin={"0 auto"}
                    front={<></>}
                    back={
                      <StyledDiv
                        h="100%"
                        maxh="270px"
                        overflow="hidden auto"
                        bbox="border-box"
                        pv="2rem"
                        ph="2rem"
                        flex
                        jcenter
                        col
                      >
                        <StyledDiv tjustify font="0.8rem">
                          {description}
                        </StyledDiv>
                        <StyledDiv>
                          <StyledDiv flex center jcenter mv="0.5rem">
                            <StyledFigure w="18px" mr="0.5rem">
                              <BulbSVG />
                            </StyledFigure>
                            <StyledSpan font="0.9rem" tcenter>
                              Tip enmicasa.pe
                            </StyledSpan>
                          </StyledDiv>
                          <StyledDiv tjustify font="0.8rem">
                            {tip}
                          </StyledDiv>
                        </StyledDiv>
                      </StyledDiv>
                    }
                  />
                  <StyledTitle
                    color={categoryIndex === index ? "#5829dd" : "#232323"}
                    ttransform="capitalize"
                    font="1.25rem"
                    mh="5%"
                    mt="1rem"
                    tcenter
                  >
                    {name}
                  </StyledTitle>
                  <StyledDiv></StyledDiv>
                </StyledDiv>
              )
            )}
          </SwipeableViews>

          {searchCategories.length > 0 && categoryIndex !== 0 && (
            <StyledDiv
              showAtMobileUI
              position="absolute"
              left="10px"
              top="calc(50% - 36px)"
            >
              <StyledFigure
                shadow
                pointer
                flex
                center
                w="36px"
                h="36px"
                onClick={handleOnMoveCategory.bind(this, { direction: false })}
              >
                <ArrowCircleSVG />
              </StyledFigure>
            </StyledDiv>
          )}
          {searchCategories.length > 0 &&
            categoryIndex !== searchCategories.length - 1 && (
              <StyledDiv
                showAtMobileUI
                position="absolute"
                right="10px"
                top="calc(50% - 36px)"
              >
                <StyledFigure
                  shadow
                  pointer
                  flex
                  center
                  w="36px"
                  h="36px"
                  onClick={handleOnMoveCategory.bind(this, { direction: true })}
                >
                  <ArrowCircleSVG side={false} />
                </StyledFigure>
              </StyledDiv>
            )}
        </StyledDiv>
      </StyledContainer>
      <StyledDiv bg="#e9e9e9">
        <StyledContainer>
          {homeAds.map(({ _id, url, link: [linkF, linkS] }) => (
            <StyledDiv
              key={_id}
              noSelect
              pointer
              flex
              col
              onClick={() => history.push(linkF, linkS)}
            >
              <StyledImg mt="-5%" w="100%" src={url} alt="home_ad" />
            </StyledDiv>
          ))}
        </StyledContainer>
      </StyledDiv>
    </>
  );
};

export default HomePage;
