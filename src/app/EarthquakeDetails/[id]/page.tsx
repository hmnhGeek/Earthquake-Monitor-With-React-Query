'use client';

import { useDispatch, useSelector } from "react-redux";
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
import { ThunkDispatch } from "@reduxjs/toolkit";

const EarthquakeDetails: React.FC = (props) => {
    const id = useParams()?.id;
    const [earthquakeDetails, setEarthquakeDetails] = useState<any>(null);

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const {earthquakeDetailsData} = useSelector((state: any) => state.detailsPage);
    const {earthquakeData} = useSelector((state: any) => state.landingPage);

    useEffect(() => {
        if(!earthquakeData && typeof id === "string" && id.trim() !== "") {
            dispatch(fetchEqDetailsByEventId({eventId: id}));
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
                            Method or algorithm used to calculate the preferred magnitude for the event
                        </TableCell>
                        <TableCell>
                            {earthquakeDetails?.properties?.magType}
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
                            Interactive Map
                        </TableCell>
                        <TableCell>
                            <a href={`${earthquakeDetails?.properties?.url}/map`} target="_blank">Map</a>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    }
    return null;
}

export default EarthquakeDetails;