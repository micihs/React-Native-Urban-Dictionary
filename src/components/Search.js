import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Text, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class Search extends Component {
    constructor() {
        super();
        this.state = {
            searchResults: [],
            loaded: false,
            isSearching: false,
            feedURL: 'https://api.urbandictionary.com/v0/autocomplete?term='
        };
    };

    searchForTerm(term) {
        let url = this.state.feedURL + term
        this.setState({isRefreshing: true})

        fetch(url).then((response) => response.json()).then((newsItems) => {
            this.setState({
            ///newsItems
                searchResults: newsItems,
                loaded: true,
                isRefreshing: false,
                isAnimating: false
            })
        }).catch((error) => {
            console.error(error);
        });
    };

    onSearch(term) {
        this.props.navigaton.push({
            title:'WoTD',
            search:termz
        })
    };

    _renderRow(data) {
        return (
            <TouchableOpacity underlayColor='white' style={{backgroundColor:'white', height:50}} onPress={() => this.onSearch(data)}>
                <View style={styles.row}>
                    <Text style={styles.rowText}>{data}</Text>
                    <Icon name="call-made" color='#9B9B9B' size={30}/>
                </View>
            </TouchableOpacity>
        );
    }

    _renderHeader() {
        return (
            <View style={styles.headerGroup}>
                <View>
                    <TouchableOpacity underlayColor='white' style={{padding:10, backgroundColor:'white', height:50}} onPress={this.props.onBack}>
                        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                            <Icon name="arrow-back" color='#9B9B9B' size={30}/>
                        </View>
                    </TouchableOpacity>
                </View>
                    <TextInput style={styles.input}
                        ref={(input) => this.searchInput = input}
                        placeholder='Enter Search Term'
                        placeholderTextColor='rgba(149, 165, 166,0.7)'
                        returnKeyType='search'
                        autoCapitalize='sentences'
                        autoFocus={true}
                        clearButtonMode='always'
                        keyboardShouldPersistTaps={true}
                        onChangeText={(text) => this.searchForTerm(text)}
                    />
            </View>
        )
    }

    render() {
        return (
            <View style={ styles.container }>
            <FlatList
                style = { styles.listContainer }
                data={this.state.searchResults}
                renderItem={({}) => this._renderRow(item)}
                keyExtractor={}
            />
            </View>
        );
    };
};

const styles = StyleSheet.create({
    container: {
        width: width-20,
        margin:10,
        shadowColor: "rgba(0,0,0,0.41)",
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowOffset: {
        height: 0,
        width: 0
        },
        borderRadius: 4,
        alignItems: 'stretch',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#ffffff',
        overflow:'visible',
        marginTop:40,
    },
    headerGroup:{
        flex:1,
        flexDirection:'row',
        marginTop:10,
        borderBottomColor: '#E8E8E8', 
        borderBottomWidth: 1,
    },
    input: {
        height: 50,
        width:width-90,
        marginBottom: 10,
        paddingHorizontal: 10
    },
    listContainer:{
        margin:20
    },
    row:{ 
        flexDirection:'row',
        justifyContent:'space-between',
        padding:5,
        borderBottomColor: '#E8E8E8', 
        borderBottomWidth: 1, 
        marginHorizontal:15,
        height:50
    },
    rowText:{
        fontSize: 20,
        textAlign: 'left',
        margin: 10,
        lineHeight:20,
    }
});


