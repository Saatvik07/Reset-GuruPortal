import React,{useState,useEffect} from 'react'
import {useSelector} from "react-redux";
import {Container,Row,Col,Card,CardBody} from "reactstrap"
import Unauthorized from '../Unauthorized/Unauthorized';
import { Accordion, AccordionTab } from 'primereact/accordion';
import FeatherIcon from "feather-icons-react";
import "./style.css";
function Profile() {
    const auth = useSelector(state => state.auth);
    const [guruObj,setGuruObj] = useState({
        "guruID": "2bf818e6-d0ff-4cb9-896d-0cd6e26d899b",
        "email": "saatvik19097@iiitd.ac.in",
        "firstName": "Satvik",
        "lastName": "Bhatt",
        "profilePhoto": "https://guru-videos-1.s3.us-east-2.amazonaws.com/profile/Satvik%20Bhatt_1610739118",
        "bio": "This is a simulation",
        "categories": [
            {
                "name": "Nutritionist",
                "ID": "cb5cb752-2cd1-4804-b1e4-07b82a83102a"
            },
            {
                "name": "Motivational Coach",
                "ID": "71af557e-716f-47e6-9959-fd92e301a44b"
            },
            {
                "name": "Holistic Therapy",
                "ID": "ce7a277d-894b-48a8-836e-cf5085ee46fd"
            }
        ],
        "keywords": [
            {
                "name": "Motivation",
                "ID": "cdbc1eae-b768-4131-89c2-0cef6b3446d9"
            },
            {
                "name": "Fitness",
                "ID": "c43aa6d3-fc01-4f20-afbd-7210f573f3a4"
            }
        ],
        "techniqueVideos": {
            "videoID": 2,
            "videoList": [
                {
                    "duration": 2,
                    "thumbnail": "https://guru-videos-1.s3.us-east-2.amazonaws.com/thumbnails/Satvik%20Bhatt/1_1610739250",
                    "video": "https://guru-videos-1.s3.us-east-2.amazonaws.com/video/Satvik%20Bhatt_2bf818e6-d0ff-4cb9-896d-0cd6e26d899b/videos/1_1610739291",
                    "title": "Video 1"
                },
                {
                    "duration": 2,
                    "thumbnail": "https://guru-videos-1.s3.us-east-2.amazonaws.com/thumbnails/Satvik%20Bhatt/1_1610739250",
                    "video": "https://guru-videos-1.s3.us-east-2.amazonaws.com/video/Satvik%20Bhatt_2bf818e6-d0ff-4cb9-896d-0cd6e26d899b/videos/1_1610739291",
                    "title": "Video 1"
                },
                {
                    "duration": 2,
                    "thumbnail": "https://guru-videos-1.s3.us-east-2.amazonaws.com/thumbnails/Satvik%20Bhatt/1_1610739250",
                    "video": "https://guru-videos-1.s3.us-east-2.amazonaws.com/video/Satvik%20Bhatt_2bf818e6-d0ff-4cb9-896d-0cd6e26d899b/videos/1_1610739291",
                    "title": "Video 1"
                },
            ]
        },
        "introVideo": {
            "photo": "https://guru-videos-1.s3.us-east-2.amazonaws.com/thumbnails/Saatvik%20Bhatnagar_1610738070",
            "video": "https://guru-videos-1.s3.us-east-2.amazonaws.com/video/Saatvik%20Bhatnagar/intro_1610738085"
        },
        "filters": [
            {
                "name": "Happiness",
                "ID": "7f275dee-fb4e-4d59-ba87-51f2a4327740"
            },
            {
                "name": "Neutral",
                "ID": "818e9f95-0d54-4712-9e2d-2142e50d3dd3"
            },
            {
                "name": "Warmth",
                "ID": "6b71fa6f-dc02-418e-ae14-29985e5f9b71"
            }
        ]
    });
    const [loading,setLoading] = useState(false);
    const fetchGuruData = async ()=>{
        setLoading(true)
        const guruId = auth.user.attributes.sub;
        fetch(`https://j6lw75i817.execute-api.us-east-2.amazonaws.com/v1/gurus/${guruId}`).then(response=>{
                if(response.ok){
                    return response.json();
                }
            }).then(jsonResponse=>{
                return jsonResponse;
            })
            .then(result=>{
                setGuruObj(result.body);
                setLoading(false);
            })
    }
    useEffect(()=>{
        //fetchGuruData();
    },[])
    return (
        <div>
            {auth.idToken?
            loading?
                <div className="loader-container">
                        <div id="preloader">
                            <div id="status">
                            <div className="spinner">
                                <div className="double-bounce1" />
                                <div className="double-bounce2" />
                            </div>
                            </div>
                        </div>
                </div>
            :
            <>
                <section>
                    <div className="embed-responsive embed-responsive-16by9 video-container">
                    <video
                        src={guruObj.introVideo.video}
                        className="embed-responsive-item"
                        controls={true}
                    />
                    </div>
                </section>
                <section className="section">
                    <Container style={{ maxWidth: '80vw', margin: '0 auto' }}>
                    <Row>
                        <Col lg="5" md="6" xs="12">
                            <Card className="job-profile shadow">
                            <div className="text-center py-5 border-bottom rounded-top">
                                <img
                                src={guruObj.profilePhoto}
                                className="avatar avatar-large mx-auto rounded-circle shadow d-block"
                                alt="profile"
                                />
                                <h5 className="mt-3 mb-0">{`${guruObj.firstName} ${guruObj.lastName}`}</h5>
                            </div>

                            <CardBody>
                                <h5 className="card-title">Details</h5>

                                <ul className="list-unstyled feature-list">
                                <li className="h6">
                                    <i>
                                    <FeatherIcon
                                        icon="mail"
                                        className="fea icon-sm text-warning mr-2"
                                    />
                                    </i>
                                    <span className="text-muted">Email :</span>{" "}
                                    {guruObj.email}
                                </li>
                                <li className="h6">
                                    <Accordion multiple activeIndex={[0]}>
                                        <AccordionTab header="EA Filters" >
                                            {guruObj.filters.map((filter)=>{
                                                return <div className="item-container">
                                                            <div id={filter.ID}>{filter.name}</div>
                                                        </div>
                                            })}
                                        </AccordionTab>
                                        <AccordionTab header="Categories">
                                            {guruObj.categories.map((category)=>{
                                                return <div className="item-container">
                                                            <div id={category.ID}>{category.name}</div>
                                                        </div>
                                            })}
                                        </AccordionTab>
                                        <AccordionTab header="Keywords">
                                        {guruObj.keywords.map((keyword)=>{
                                                return <div className="item-container">
                                                            <div id={keyword.ID}>{keyword.name}</div>
                                                        </div>
                                            })
                                        }
                                        </AccordionTab>
                                    </Accordion>
                                </li>
                                </ul>
                            </CardBody>
                            </Card>
                        </Col>

                        <Col lg="7" md="6" xs="12" className="mt-4 mt-sm-0 pt-2 pt-sm-0">
                            <div className="ml-lg-4">
                            <h4>Bio :</h4>
                            <p className="text-muted">
                                {guruObj.bio}
                            </p>
                            <h4 className="mt-lg-5 mt-4">Technique Videos :</h4>
                            <Row>
                                {guruObj.techniqueVideos.videoList.map((techVideo, key) => (
                                <Col key={key} md={4} xs={12} className="mt-4 pt-2">
                                    <Card className="work-container work-classic">
                                    <CardBody className="p-0">
                                        <img
                                            src={techVideo.thumbnail}
                                            className="img-fluid rounded work-image"
                                            alt="Landrick"
                                        />
                                        <div className="content pt-3">
                                        <h5 className="mb-0 title" style={{color:"#ff5001"}}>
                                            {techVideo.title}
                                        </h5>
                                        <h6 className="text-muted tag mb-0">
                                            <i>
                                                <FeatherIcon icon="clock"/>
                                            </i>
                                            {" "}
                                            {`${techVideo.duration} min`}
                                        </h6>
                                        <div className="watchMore-container">
                                            <a
                                                href={techVideo.video}
                                                rel="noreferrer"
                                                target="_blank"
                                                className="text-muted readmore"
                                            >
                                                Watch{" "}
                                                <i>
                                                    <FeatherIcon icon="chevron-right"/>
                                                </i>
                                            </a>
                                        </div>
                                        </div>
                                    </CardBody>
                                    </Card>
                                </Col>
                                ))}
                            </Row>
                            </div>
                        </Col>
                        </Row>
                    </Container>
                </section>
            </>
            :<Unauthorized/>}

        </div>
    )
}

export default Profile
