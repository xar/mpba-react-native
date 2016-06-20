/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
var React = require('react-native');
var {
  ScrollView,
  Image,
  AppRegistry,
  StyleSheet,
  Text,
  NavigatorIOS,
  ListView,
  View,
} = React;


var SearchScreen = React.createClass({

  render: function() {
    var movie = MOCKED_MOVIES_DATA[0];
    return (
      <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus corrupti, suscipit dicta dolorem assumenda, ducimus facilis rerum, nulla porro aperiam nesciunt possimus velit dolore itaque quibusdam molestiae ipsam cumque unde.</Text>
    )
  },

});

var MOCKED_MOVIES_DATA = [
  {title: 'Movie', year: '2015', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
];

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
})

module.exports = SearchScreen;
