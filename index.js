import React, { Component } from "react";
import { StyleSheet, View, ListView, Dimensions } from "react-native";
import PropTypes from "prop-types";

const { width } = Dimensions.get("window");

export default (Tiles = (
  { style = {}, tilesPerRow = 3, dataSource, renderItem }
) => {
  const tileDimensions = calcTileDimensions(width, tilesPerRow);
  return (
    <View style={{ flex: 1 }}>
      <ListView
        contentContainerStyle={[style || {}, styles.list]}
        dataSource={dataSource}
        renderRow={i => {
          const Hoc = MakeHOCItem({
            ...tileDimensions
          })(renderItem);
          return <Hoc itemData={i} />;
        }}
      />
    </View>
  );
});

Tiles.propTypes = {
  style: PropTypes.object,
  tilesPerRow: PropTypes.number,
  renderItem: PropTypes.func.isRequired,
  dataSource: PropTypes.instanceOf(ListView.DataSource).isRequired
};

const MakeHOCItem = ({ size, margin }) =>
  Comp =>
    ({ itemData }) => {
      return (
        <View style={{ width: size, height: size, marginHorizontal: margin }}>
          {Comp(itemData, size)}
        </View>
      );
    };

const calcTileDimensions = (deviceWidth, tpr) => {
  const margin = deviceWidth / (tpr * 10);
  const size = (deviceWidth - margin * (tpr * 2)) / tpr;
  return { size, margin };
};

const styles = StyleSheet.create({
  list: {
    justifyContent: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap"
  }
});
