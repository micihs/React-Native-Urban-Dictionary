import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Text, Dimensions, StatusBar, ActivityIndicator, TouchableOpacity, InteractionManager } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Card from './wordCard'

const width = Dimensions.get('window').height;
const height = Dimensions.get('window').height;


export default class WordFeed extends Component { 

  constructor() {
    super();
    this.state = {
        dataSource: [],
        loaded: false,
        isAnimating: true,
        isRefreshing: true,
        feedURL: 'https://api.urbandictionary.com/v0/words_of_the_day'

        };
    }

    componentDidMount() {
        this.setState({feedURL: this.props.feedURL})
        
        InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: false});
            this.fetchWordsOfTheDay()
        });

    }

    fetchWordsOfTheDay(){
        this.setState({isRefreshing: true})

        fetch(this.props.feedURL).then((response) => response.json()).then((newsItems) => {
            this.setState({
                dataSource: newsItems.list,
                loaded: true,
                isRefreshing: false,
                isAnimating: false
            })
        }).catch((error) => {
            console.error(error);
            this.setState({
                loaded: true,
                isRefreshing: false,
                isAnimating: false
            })
        });
    }
    _renderRows(data) {
            return (<Card style={styles.card} data={data} />);
    }
    
    renderLoadingIndicator() {
        return(
        <View style={{flexDirection: 'column', flex: 1, backgroundColor:'white'}}>
            <View style = {{ flexDirection: 'column', justifyContent: 'center', flex: 1, backgroundColor:'white'}} > 
                <ActivityIndicator
                    animating={this.state.animating}
                    color='#e67e22'
                    style={[ styles.centering, {height: 80}]}
                    size="large"/>
            </View>
        </View>
        );
    }

    renderWordsFeed() {
        return (


            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#F4F4F4"
                    barStyle="default"
                />
            <View style={styles.header}> 
                <TouchableOpacity underlayColor='white' style={{padding:10, backgroundColor:'white', height:40}} onPress={this.props.onBack}>
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                        <Icon name="arrow-back" color='#9B9B9B' size={30}/>
                    </View>
                </TouchableOpacity>  

                <Text style={styles.title}> {this.props.title}</Text>

                <TouchableOpacity underlayColor='white' style={{padding:10, backgroundColor:'white', height:40}} onPress={this.props.onMenuPress}>
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                         <Icon name="search" color='#9B9B9B' size={30}/>
                    </View>
                </TouchableOpacity>  
            </View>

            <FlatList
                style = { styles.listContainer }
                data={this.state.dataSource}
                renderItem={(rowData) => this._renderRows({...rowData})}
            />

            </View>
         );
    }

    render() {
        return this.state.isRefreshing? this.renderLoadingIndicator() : this.renderWordsFeed()
    }

}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#F4F4F4',
        alignItems: 'stretch',
        width:width
    },
    listContainer: {
        flex: 1,
        backgroundColor:'#F4F4F4',
        alignItems: 'center',
        overflow:'visible'
    },
    header: {
        backgroundColor:'white',
        marginTop:0,
        paddingTop: 20,
        height:64,
        flexDirection:'row',
        justifyContent:'space-between',
        width:width,
        borderBottomColor:'rgba(151,151,151,0.16)',
        borderBottomWidth:1
    },
    title:{
        fontSize: 25,
        fontWeight: 'bold',
        fontFamily: 'Arial Rounded MT Bold',
        textAlign: 'center',
        color: '#3498db',
        marginTop:5
    },
    card:{
        alignItems: 'center',
        justifyContent: 'center',

    },
    closeButton:{
        marginTop:-60,
        padding:10, 
        margin:20,
        alignItems:'flex-end', 
        backgroundColor:'transparent', 
        height:50,
        borderRadius:4,
        marginTop: 44,
    },

});