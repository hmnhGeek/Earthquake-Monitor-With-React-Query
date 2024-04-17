'use client';

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import axios from "axios";
import { Loader, Container, Header, Button, Icon } from "semantic-ui-react";
import {
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from 'semantic-ui-react';
import { AppDispatch, RootState } from "@/redux/store";
import { loadLast24HrsData, fetchDateRangeData } from "@/redux/actions/landingPageActions";
import {
  StatisticValue,
  StatisticLabel,
  StatisticGroup,
  Statistic,
} from 'semantic-ui-react';
import { GridColumn, Grid, GridRow } from 'semantic-ui-react'
import SemanticDatepicker from "react-semantic-ui-datepickers";
import { getYYYMMDD } from "./utils/utils";
import Link from "next/link";

interface HomeProps {
  earthquakeData: any;
  isLoading: boolean;
  error: string | null;
  loadLast24HrsData: () => void;
  fetchDateRangeData: (startDate: string, endDate: string) => void;
}

const Home: React.FC<HomeProps> = props => {
  const {earthquakeData, isLoading, error, loadLast24HrsData, fetchDateRangeData} = props;

  useEffect(() => {
    loadLast24HrsData();
  }, []);

  const [currentRange, setNewRange] = useState<any[]>([]);
  const onChangeDateRange = (event: any, data: any) => setNewRange(data.value);

  const startFetchProcess = () => {
    let startDate = getYYYMMDD(new Date(currentRange?.[0]));
    let endDate = getYYYMMDD(new Date(currentRange?.[1]));

    if(startDate && endDate) {
      fetchDateRangeData(startDate, endDate);
    }
  }

  // if(isLoading) return <Loader inverted content="loading" inline="centered" />;

  return (
    <Container style={{marginTop: "25px"}}>
      <Header as='h2'>
        {currentRange === null || (currentRange && currentRange.length === 0) ? "Earthquakes in last 24 hours" : `Earthquakes from ${getYYYMMDD(new Date(currentRange?.[0]))} to ${getYYYMMDD(new Date(currentRange?.[1]))}`}
      </Header>
      <div>
        <Grid>
          <GridRow>
            <GridColumn width={8}>
              <StatisticGroup>
                <Statistic color="yellow">
                  <StatisticValue>{earthquakeData?.features?.filter((x: any) => x.properties.mag < 5).length}</StatisticValue>
                  <StatisticLabel>{"< 5M"}</StatisticLabel>
                </Statistic>
                <Statistic color="orange">
                  <StatisticValue>{earthquakeData?.features?.filter((x: any) => x.properties.mag >= 5 && x.properties.mag < 8).length}</StatisticValue>
                  <StatisticLabel>{"5M - 8M"}</StatisticLabel>
                </Statistic>
                <Statistic color="red">
                  <StatisticValue>{earthquakeData?.features?.filter((x: any) => x.properties.mag >= 8).length}</StatisticValue>
                  <StatisticLabel>{">= 8M"}</StatisticLabel>
                </Statistic>
              </StatisticGroup>
            </GridColumn>
            <GridColumn width={6}>
              <SemanticDatepicker onChange={onChangeDateRange} type="range" />
            </GridColumn>
            <GridColumn width={2}>
              <Button onClick={startFetchProcess}>Search</Button>
            </GridColumn>
          </GridRow>
        </Grid>
      </div>
      <div style={{maxHeight: "550px", overflow: "auto", marginTop: "35px"}}>
        {
          isLoading ? <Loader inverted content="loading" inline="centered" /> :
          <Table celled selectable striped arial-label="Default table">
            <TableHeader style={{position: "sticky", top: "0", zIndex: "1"}}>
              <TableRow>
                <TableHeaderCell>
                  Place
                </TableHeaderCell>
                <TableHeaderCell>
                  Magnitude
                </TableHeaderCell>
                <TableHeaderCell>
                  Occured Timestamp
                </TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {earthquakeData?.features?.map((item: any) => (
                <TableRow>
                  <TableCell><Link href={`/EarthquakeDetails/${item.id}`}>{item.properties.place}</Link></TableCell>
                  <TableCell>
                    {item.properties.mag?.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    {(new Date(item.properties?.time)).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        }
      </div>
      
    </Container>
  );
}

const mapStateToProps = (state: RootState) => {
  return {
      earthquakeData: state.landingPage.earthquakeData,
      isLoading: state.landingPage.isLoading,
      error: state.landingPage.error
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    loadLast24HrsData: () => dispatch(loadLast24HrsData()),
    fetchDateRangeData: (startDate: string, endDate: string) => dispatch(fetchDateRangeData(startDate, endDate)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
