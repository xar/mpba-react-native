/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');

var {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
  Text,
  ListView,
  View
} = React;

var SearchScreen = require('./components/search');
var MPBAStorage = require('./components/MPBAStorage');

var MPBA = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: '_MPBA',
          component: MPBAStorage,
        }}
      />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

AppRegistry.registerComponent('MPBA', () => MPBA);

module.exports = MPBA;
