import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions, StatusBar, Image, Text, Button, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Feed from './WordFeed';
import Header from'./header';
import Search from './Search';
import Menu from './Menu';
import NoConnection from './NoConnection';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class MainScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modalIsVisible: false,
            isNetworkConnected: false
        };
    };

    componentDidMount(){
        this.setState({
            modalIsVisible: false,
        })
    };

    setMenuVisible(visible) {
        this.setState({menuIsVisible: visible})
    }

    onMenuPress() {
        this.setMenuVisible(!this.state.menuIsVisible)
    }

    onSearchPress(){
        this.setMenuVisible(false)
        this.props.navigaton.push('Search')
    }

    onRandomPress() {
        this.setMenuVisible(false)
            this.props.navigator.push('Random',{title: word, feedURL: 'https://api.urbandictionary.com/v0/random', onBack: () => navigation.pop()})
    }

    onTrendingPressed(word){
        this.props.navigator.push('WoTD',{title: word, feedURL: 'https://api.urbandictionary.com/v0/define?term='+word, onBack: () => navigation.pop()})
    }

    onMenuWoTDPressed(){
        this.setMenuVisible(false)
        this.props.navigator.push('WoTD_2',{title: "Word of the Day", feedURL: 'https://api.urbandictionary.com/v0/words_of_the_day', onBack: ()=> navigation.pop()})
    }

    logo() {
        return(
            <View style={styles.logoContainer}> 
                <Image style={styles.logo} source={require('../assets/IconLarge.png')} resizeMode='cover'/>
            </View>
        );
    }

    header(){
        return(
            <View style={styles.header}> 
                <TouchableOpacity underlayColor='white' style={{padding:10, backgroundColor:'white', height:40}} onPress={() => this.onMenuPress()}>
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                        <Icon name="menu" color='#9B9B9B' size={30}/>
                    </View>
                </TouchableOpacity>  
                <TouchableOpacity underlayColor='white' style={{padding:10, backgroundColor:'white', height:40}} onPress={() => this.onSearchPress()}>
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                        <Icon name="search" color='#9B9B9B' size={30}/>
                    </View>
                </TouchableOpacity>  
            </View>
        );
    }

    buttonGroup(){
        return(
            <View style={styles.buttonGroups}>
                <TouchableOpacity  activeOpacity={0.6} underlayColor='rgba(0,0,0,0.001)' style={styles.feelingLucky} onPress={() => this.onRandomPress()}>
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                        <Icon name="shuffle" color='rgba(149, 165, 166,1.0)' size={30}/>
                        <Text style={styles.buttonTitle}> I'm Feeling Lucky </Text>
                    </View>
                </TouchableOpacity> 
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column',
    },
    header:{
        marginHorizontal:10,
        marginTop:20,
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'white',

        height: 64,
    },
    logo:{
        width:200,
        height: width*0.2,
        alignItems:'center'
    },
    logoContainer:{
        alignItems:'center',
        marginTop:100,
    },
    feelingLucky:{
        padding:10, 
        margin:20,
        alignItems:'center', 
        backgroundColor:'rgba(0,0,0,0.04)', 
        height:50,
        borderRadius:4,
        marginTop: 44,
    },
    buttonTitle:{
        fontSize: 21,
        fontWeight: '200',
        fontFamily: 'Arial Rounded MT Bold',
        textAlign: 'center',
        color: 'rgba(149, 165, 166,1.0)',
    },
    latestTitle:{
        fontSize: 21,
        fontWeight: '300',
        textAlign: 'center',
        color: '#34495E',
        marginTop:50,
        marginBottom:20
    },
    latestRowItems:{
        fontSize: 21,
        fontWeight: '300',
        textAlign: 'center',
        color: '#3498db',
        margin:10,

    }
});