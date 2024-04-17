'use client';

import { RootState } from "@/redux/store";
import { connect } from "react-redux";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Header } from "semantic-ui-react";

interface EarthquakeDetailsProps {
    earthquakeData: any;
}

const EarthquakeDetails: React.FC<EarthquakeDetailsProps> = (props) => {
    const id = useParams()?.id;
    const {earthquakeData} = props;
    const [earthquakeDetails, setEarthquakeDetails] = useState<any>(null);

    useEffect(() => {
        let extractedData = earthquakeData?.features?.filter((x: any) => x.id === id)?.[0];

        if(extractedData) {
            setEarthquakeDetails(extractedData);
        }
        else {
            setEarthquakeDetails(null);
        }
    }, [id]);


    if(earthquakeDetails) {
        return <div style={{marginTop: "25px"}}>
            <Header as="h2">{earthquakeDetails?.properties?.title}</Header>
        </div>
    }
    return null;
}

const mapStateToProps = (state: RootState) => {
    return {
        earthquakeData: state.landingPage.earthquakeData,
    };
};

export default connect(mapStateToProps, null)(EarthquakeDetails);