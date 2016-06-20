'use strict';
var React = require('react-native');

var {
  ActivityIndicatorIOS,
  TouchableHighlight,
  ScrollView,
  Image,
  AppRegistry,
  StyleSheet,
  Text,
  NavigatorIOS,
  ListView,
  View,
  PixelRatio,
} = React;

var ItemsActions = require('../actions/items')
var Firebase = require('firebase');

var OpenPlace = require('../components/OpenPlace');

var MPBAStorage = React.createClass({

  getInitialState: function(){
     var getSectionData = function(dataBlob, sectionID){
        return dataBlob[sectionID];
    }

    var getRowData = function(dataBlob, sectionID, rowID){
        return dataBlob[sectionID + ':' + rowID];
    }
    return {
      itemsLoaded: false,
      dataBlob: {},
      dataSource: new ListView.DataSource({
        getSectionData: getSectionData,
        getRowData: getRowData,
        rowHasChanged: (r1, r2) => r1 !== r2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      }),
    }
  },

  componentWillMount: function() {
    this.fetchOnlineItems();
  },

  fetchOnlineItems: function(){
    var firebaseItem = new Firebase("https://mpba.firebaseio.com/frontpage");
    var that = this;
    firebaseItem.on('value', function(snapshot){
      var tempDataBlob = that.state.dataBlob;
      var data = snapshot.val();
      var item,
          sectionIDs = [],
          rowIDs = [],
          dataBlob = {},
          places,
          placesLenght,
          place;
      for(var i=0;i<data.length; i++){
        item = data[i];
        var uid = data[i].title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        sectionIDs.push(uid);
        dataBlob[uid] = item.title;

        places = item.items;
        placesLenght = places.length;

        rowIDs[i] = [];
        for(var j=0;j<placesLenght;j++){
          place = places[j];
          var sUid = place.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
          rowIDs[i].push(sUid);
          dataBlob[uid+':'+sUid] = place;
        }
      }
      that.setState({
        dataSource: that.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
        itemsLoaded: true
      })
    }, function(error){
      console.log(error);
    })
  },

  renderRow: function (item, sectionId) {
    return (
        <TouchableHighlight onPress={this.onPress()} underlayColor="#99d9f4" activeOpacity={0.4}>
        <View>
          <View style={styles.rowItem}>
            <View>
              <Text>{item.name}</Text>
            </View>
          </View>
          <View style={styles.separator} />
        </View>
        </TouchableHighlight>
    );
  },

  renderSectionHeader: function(sectionData, sectionId) {
        return (
            <View style={styles.rowSectionHeader}>
                <Text style={styles.text}>{ sectionData }</Text>
            </View>
        );
  },

  render: function() {
    if (this.state.itemsLoaded) {
      return(
        <View style={styles.container}>
          <ListView
            automaticallyAdjustContentInsets={false}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
            renderSectionHeader={this.renderSectionHeader}/>
        </View>
      );
    } else {
      return(
        <View style={styles.centering}>
          <ActivityIndicatorIOS
            animating={this.state.animating}
            style={[styles.centering, {height: 80}]}
            size="large"/>
        </View>
      );
    }
  },

  onPress: function(){
    this.props.navigator.push({
      title: 'name',
      component: OpenPlace
    });
  }

});

var styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingTop: 65,
    flex: 1
  },
  centering: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerOffset: {
    paddingTop: 65
  },
  rowSectionHeader:{
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    fontWeight: 'bold',
    color: '#004d37'
  },
  rowItem:{
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  }

})

AppRegistry.registerComponent('MPBAStorage', () => MPBAStorage);

module.exports = MPBAStorage;
