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
    try {
      const response = await ImageService.getImages(value, currPage);

      this.setState(prevState => ({
        photos: [...prevState.photos, ...response.photos],
        totalResults: response.total_results,
      }));
    } catch {}
  };

  handleSubmit = data => {
    this.setState({ query: data });
  };

  render() {
    console.log(this.state);
    return (
      <>
        {/* <Text textAlign="center">Sorry. There are no images ... 😭</Text> */}
        <SearchForm onSubmit={this.handleSubmit} />
      </>
    );
  }
}
