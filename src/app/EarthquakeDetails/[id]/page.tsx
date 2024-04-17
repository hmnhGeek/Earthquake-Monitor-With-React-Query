'use client';

import { AppDispatch, RootState } from "@/redux/store";
import { connect } from "react-redux";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Header, Message, MessageHeader } from "semantic-ui-react";
import {
    TableRow,
    TableHeaderCell,
    TableHeader,
    TableCell,
    TableBody,
    Table,
  } from 'semantic-ui-react';
import { fetchEqDetailsByEventId } from "@/redux/actions/detailsPageActions";

interface EarthquakeDetailsProps {
    earthquakeData: any;
    earthquakeDetailsData: any;
    fetchEqDetailsByEventId: (eventId: string) => void;
}

const EarthquakeDetails: React.FC<EarthquakeDetailsProps> = (props) => {
    const id = useParams()?.id;
    const {earthquakeData, earthquakeDetailsData, fetchEqDetailsByEventId} = props;
    const [earthquakeDetails, setEarthquakeDetails] = useState<any>(null);

    useEffect(() => {
        if(!earthquakeData && typeof id === "string" && id.trim() !== "") {
            fetchEqDetailsByEventId(id);
        }
        else {
            let extractedData = earthquakeData?.features?.filter((x: any) => x.id === id)?.[0];
            if(extractedData) {
                setEarthquakeDetails(extractedData);
            }
            else {
                setEarthquakeDetails(null);
            }
        }
    }, [earthquakeData, id]);

    useEffect(() => {
        if(earthquakeDetailsData && !earthquakeData) setEarthquakeDetails(earthquakeDetailsData);
    }, [earthquakeData, earthquakeDetailsData])

    if(earthquakeDetails) {
        return <div style={{marginTop: "25px"}}>
            <Header as="h2">{earthquakeDetails?.properties?.title}</Header>
            {earthquakeDetails?.properties?.status === "reviewed" && <Message>
                <MessageHeader>Verification Status</MessageHeader>
                <p>
                    This detail is verified by an expert.
                </p>
            </Message>}
            {
                earthquakeDetails?.properties?.tsunami !== 0 &&
                <Message negative>
                    <MessageHeader>Tsunami Alert!!</MessageHeader>
                    <p>There is a chance of tsunami event.</p>
                </Message>
            }
            {
                earthquakeDetails?.properties?.alert &&
                <Message color={earthquakeDetails?.properties?.alert}>There is a {earthquakeDetails?.properties?.alert} alert.</Message>
            }

            <Table celled selectable striped arial-label="Default table">
                <TableHeader style={{position: "sticky", top: "0", zIndex: "1"}}>
                    <TableRow>
                        <TableHeaderCell>
                            Attribute
                        </TableHeaderCell>
                        <TableHeaderCell>
                            Value
                        </TableHeaderCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            Magnitude
                        </TableCell>
                        <TableCell>
                            {earthquakeDetails?.properties?.mag.toFixed(2)}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            Horizontal distance from the epicenter to the nearest station (in degrees)
                        </TableCell>
                        <TableCell>
                            {earthquakeDetails?.properties?.dmin?.toFixed(2)}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            Total number of seismic stations used to determine earthquake location
                        </TableCell>
                        <TableCell>
                            {earthquakeDetails?.properties?.nst}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            Event Significance [0-1000]
                        </TableCell>
                        <TableCell>
                            {earthquakeDetails?.properties?.sig}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            Occurence Timestamp
                        </TableCell>
                        <TableCell>
                            {(new Date(earthquakeDetails.properties?.time)).toLocaleString()}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            Place
                        </TableCell>
                        <TableCell>
                            {earthquakeDetails?.properties?.place}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    }
    return null;
}

const mapStateToProps = (state: RootState) => {
    return {
        earthquakeData: state.landingPage.earthquakeData,
        earthquakeDetailsData: state.detailsPage.earthquakeDetailsData,
    };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        fetchEqDetailsByEventId: (eventId: string) => dispatch(fetchEqDetailsByEventId(eventId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EarthquakeDetails);