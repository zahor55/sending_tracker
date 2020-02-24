import React, { Component } from 'react';
import { StyleSheet, View,Alert } from 'react-native';
import {Text, Input, Button } from 'galio-framework'
import {Header} from "react-native-elements";
import { RadioButton } from 'react-native-paper';
import axios from 'axios'
import {id} from './src/consts'

export default class App extends Component{
    constructor(props){
        super(props);
        this.sendNum=this.sendNum.bind(this);
        this.sendWithoutNum=this.sendWithoutNum.bind(this);
        this.state={
            trackNum:"",
            mail:"",
            clientName:"",
            value: "register",
            loading:"שליחת מספר מעקב בקלות"

        };


    }

    async sendNum(){
        let response;
        this.setState({loading:"שולח כעת את מייל המעקב"})
        try{
        if(this.state.clientName!==""){
            response =await axios.get(`https://trackebay.herokuapp.com/num/${this.state.trackNum}/${this.state.mail}/${this.state.clientName}/{const.id}`)
        }
        else
            response =await axios.get(`https://trackebay.herokuapp.com/num/${this.state.trackNum}/${this.state.mail}/{const.id}`);

        if (response.data.code === 200){
            this.setState({
                loading:"המייל נשלח ללקוח",
                trackNum:"",
                mail:"",
                clientName:"",
                value: "register"
            })
        }
        else {
            this.setState({loading:"יש בעיה עם אחד הנתונים שהקשתה"})
        }}
        catch(e){
            console.log(e)
            this.setState({
                loading:"קיימת בעיה טכנית עם השרת",
            })
    }

}
    async sendWithoutNum(){
        let response;
        this.setState({loading:"שולח כעת את מייל המעקב"})
        try{
        if(this.state.clientName!==""){
            response =await axios.get(`https://trackebay.herokuapp.com/noNum/${this.state.value}/${this.state.mail}/${this.state.clientName}/{const.id}`)
        }
        else response =await axios.get(`https://trackebay.herokuapp.com/noNum/${this.state.value}/${this.state.mail}/{const.id}`)
        if (response.data.code === 200){
                    this.setState({
                        loading:"המייל נשלח ללקוח",
                        trackNum:"",
                        mail:"",
                        clientName:"",
                        value: "register"
                    })

                }
                else{
                    this.setState({loading:"יש בעיה עם אחד הנתונים שהקשתה"})
                }
            }
        catch(e){
            console.log(e)
            this.setState({
                loading:"קיימת בעיה טכנית עם השרת",
            })
    }}

  render() {
    return (
        <View style={styles.container}>
            <Header
                centerComponent={{ text: 'Tracker Sender', style: { color: '#fff',fontSize:25,fontWeight: 'bold', } }}
            />
            <Text h5 style={{marginTop:10,marginBottom:10,color:"blue"}}>{this.state.loading}</Text>
            <View style={{marginTop:50}}>
                <Input  value={this.state.trackNum} onChangeText={(text) => { if(this.state.value==="register")this.setState({
                    trackNum:text
                }) }} placeholder="מספר מעקב" />
                <Input value={this.state.mail} onChangeText={(text) => {
                    this.setState({
                        mail:text
                    })
                }} placeholder="כתובת אימייל" type="email-address" />
                <Input  placeholder="שם הלקוח(רשות)" value={this.state.clientName} onChangeText={(text) => { this.setState({
                    clientName:text
                }) }} />
                <Text h4 style={{fontSize:25,marginTop:10,marginBottom:10}}>בחירת סוג המשלוח:</Text>
                <RadioButton.Group
                    onValueChange={value => {
                        if(value!=="register"){
                            this.setState({trackNum:""})
                        }
                        this.setState({ value })
                    }}
                    value={this.state.value}
                >
                    <View style={{flexDirection:"row-reverse"}}>
                        <RadioButton value="register" />
                        <Text>דואר רשום</Text>
                    </View>

                    <View style={{flexDirection:"row-reverse"}}>
                        <RadioButton value="24" />
                        <Text>דואר 24</Text>
                    </View>

                    <View style={{flexDirection:"row-reverse"}}>
                        <RadioButton value="express" />
                        <Text >דואר מהיר אקספרס</Text>
                    </View>

                    <View style={{flexDirection:"row-reverse"}}>
                        <RadioButton value="regular" />
                        <Text>דואר רגיל(ללא מספר מעקב)</Text>
                    </View>
                </RadioButton.Group>
                <Button style={{marginTop:60}} onPress={() => {
                    if(this.state.trackNum==="" && this.state.value==="register"){
                        Alert.alert(
                            '',
                            'לא הכנסתה מספר מעקב!!',

                        );

                    }
                    else if(this.state.mail!=="") {
                        Alert.alert(
                            '',
                            'האם אתה בטוח שאתה רוצה לשלוח?',
                            [
                                {
                                    text: 'שלח',
                                    onPress: () => {
                                        if (this.state.value === "register")
                                            this.sendNum()
                                        else {
                                            this.sendWithoutNum()
                                        }
                                    },
                                },
                                {
                                    text: 'ביטול',
                                    onPress: () => {
                                        console.log("press cancel")
                                    },
                                    style: 'cancel',
                                },
                            ],
                        );
                    }
                    else{
                        Alert.alert(
                            '',
                            'לא הכנסתה מייל לשליחה',

                        );
                    }
                }} color="info">שלח מייל</Button>
            </View>

        </View>
    );
  }
x

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',

  }
});
