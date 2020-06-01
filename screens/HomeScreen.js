import React, {Component} from 'react';
import {Text,View,StyleSheet,TextInput,TouchableOpacity} from 'react-native';
import {Header} from 'react-native-elements';

import  dictionary from '../database';


export default class HomeScreen extends React.Component{
 constructor(){
     super()

     this.state = {
         text: '',
         searchPress : false,
         Load : false,
         word : "Thanks for your patience.......",
         lexicalCategory: '',
         definition : ''
     }
 }

 fetchWord=(text)=>{
     var text = text.toLowerCase().trim()

     try{
         var word = dictionary[text]["word"]
         var lexicalCategory = dictionary[text]["lexicalCategory"]
         var definition = dictionary[text]["definition"]

         this.setState({
             "word" :  word,
             "lexicalCategory" : lexicalCategory,
             "definition" : definition
         })

     }

     catch(err){
         alert("Sorry this word does not exist")
         this.setState({
             text : '',
             searchPress : false
         })
     }
 }

    render(){
        return(
            <View style= {{flex:1}}>
                <Header
                backgroundColor = {'red'}
                centerComponent = {{
                    text : 'Pocket Dictionary',
                    style: {color:'grey',fontSize : 20}
                }}
                
                />
                <View style = {StyleSheet.inputBoxContainer}>
                <TextInput
                style = {styles.inputBox}
                onChangeText = {text=>{
                    this.setState({
                        text: text,
                        searchPress : false,
                        word: "Thanks for your patience...",
                        lexicalCategory: '',
                        definition: ''
                    })
                }}
                
                value = {this.state.text}

                />
<TouchableOpacity
style = {styles.goButton}
onPress={()=>{
    this.setState({
    searchPress: true
    })

    this.fetchWord(this.state.text)
}}
>
    <Text style = {styles.searchText}>Go</Text>

</TouchableOpacity>
                </View>
                <View style = {styles.ouputContainer}>
                    <Text style = {{fontSize : 20}}>
                    {
                        this.state.searchPress && this.state.word === "Thanks for your patience..."
                        ? this.state.word
                        : " "
                    }
                    </Text>
                    {
                        this.state.word !== "Thanks for your patience..." ?
                         (
                       <View style = {{ justifyContent: 'center', marginLeft:10}}>
                           <View style = {styles.detailsContainer}>
                            <Text style = {styles.detailsTitle}>
                                Word: {" "}
                            </Text>
                            <Text style = {{fontSize : 18}}>
                            {this.state.word}
                            </Text>
                           </View>
                           <View style = {styles.detailsContainer}>
                               <Text style = {styles.detailsTitle}>
                                   Type: {" "}
                               </Text>
                               <Text style = {{fontSize : 18}}>
                                   {this.state.lexicalCategory}
                               </Text>
                           </View>

                            <View style = {{flexDirection: 'row', flexWrap: 'wrap'}}>
                                <Text style = {styles.detailsTitle}>
                                    Definition : {' ' }
                                </Text>
                                <Text style  = {{fontSize : 18}}>
                                    {this.state.definition}
                                </Text>
                            </View>
                       </View>

                        )
                        : null

                    }

                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    inputBoxContainer: {
      flex:0.3,
      alignItems:'center',
      justifyContent:'center'
    },
    inputBox: {
      width: '80%',
      alignSelf: 'center',
      height: 40,
      textAlign: 'center',
      borderWidth: 4,
    },
    searchButton: {
      width: '40%',
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
      borderWidth: 2,
      borderRadius: 10,
    },
    searchText:{
      fontSize: 20,
      fontWeight: 'bold'
    },
    outputContainer:{
      flex:0.7,
      alignItems:'center'
    },
    detailsContainer:{
      flexDirection:'row',
      alignItems:'center'
    },
    detailsTitle:{
      color:'orange',
      fontSize:20,
      fontWeight:'bold'
    }
  });