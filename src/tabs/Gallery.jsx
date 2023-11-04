import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    query: '',
    page: 1,
    photos: [],
    totalResults: 0,
    error: null,
    isLoading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.fetchImages(this.state.query, this.state.page);
    }
  }

  fetchImages = async (value, currPage) => {
    this.setState({ isLoading: true });
    try {
      const response = await ImageService.getImages(value, currPage);

      this.setState(prevState => ({
        photos: [...prevState.photos, ...response.photos],
        totalResults: response.total_results,
      }));
    } catch(error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSubmit = data => {
    this.setState({
      query: data,
      page: 1,
      photos: [],
      totalResults: 0,
      error: null,
      isLoading: false,
    });
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { query, photos, totalResults, isLoading, error } = this.state;
    const noImg = query && !totalResults && !isLoading
    return (
      <>
        
        <SearchForm onSubmit={this.handleSubmit} />
        {isLoading && <Text textAlign="center">Loading ... 😭</Text>}
        {error && <Text textAlign="center">Sorry, restart 😭</Text>}
        {noImg && <Text textAlign="center">Sorry, there are no img 😭</Text>}
        <Grid>
          {photos.map(({ id, avg_color, alt, src: { large } }) => {
            return (
              <GridItem key={id}>
                <CardItem color={avg_color}>
                  <img src={large} alt={alt} />
                </CardItem>
              </GridItem>
            );
          })}
        </Grid>
        {photos.length < totalResults && (
          <Button onClick={this.loadMore}>Load More...</Button>
        )}
      </>
    );
  }
}
