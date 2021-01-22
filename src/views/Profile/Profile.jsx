import React,{useState,useEffect} from 'react'
import {useSelector} from "react-redux";
import {Container,Row,Col,Card,CardBody} from "reactstrap"
import Unauthorized from '../Unauthorized/Unauthorized';
import { Accordion, AccordionTab } from 'primereact/accordion';
import FeatherIcon from "feather-icons-react";
import "./style.css";
function Profile() {
    const auth = useSelector(state => state.auth);
    const [guruObj,setGuruObj] = useState(null);
    const [loading,setLoading] = useState(true);
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
                console.log(result);
                setGuruObj(result.body);
                setLoading(false);
            })
    }
    useEffect(()=>{
        if(auth.idToken){
            fetchGuruData();
        }
        
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
                        <Col lg="4" md="5" xs="12">
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

                        <Col lg={{ size: 7, offset: 1 }} md="6" xs="12" className="mt-4 mt-sm-0 pt-2 pt-sm-0">
                            <div className="ml-lg-4">
                            <h4>Bio :</h4>
                            <p className="text-muted">
                                {guruObj.bio}
                            </p>
                            <h4 className="mt-lg-5 mt-4">Technique Videos :</h4>
                            <Row>
                                {guruObj.techniqueVideos.videoList.length>0?
                                guruObj.techniqueVideos.videoList.map((techVideo, key) => (
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
                                ))
                                :
                                <div className="empty-techVideos-container">
                                    <h3>No technique videos</h3>
                                </div>
                                }
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
