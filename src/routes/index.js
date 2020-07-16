import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePageComponent from '../components/homepage';
import LiveChartComponent from '../components/livechart';

const Index = () => (
    <Switch>
        <Route exact path="/" component={HomePageComponent} />
        <Route exact path="/live-chart" component={LiveChartComponent} />
    </Switch>
);

export default Index;