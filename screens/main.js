import React from "react";
import {View, Text, StyleSheet, SafeAreaView, StatusBar, Platform} from "react-native";
import { Camera } from "expo-camera";
import * as Permissions from 'expo-permissions';
import * as FaceDetector from 'expo-face-detector';

export default class Main extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            cameraPermission : null,
            faces :[]

        }


    }

    componentDidMount(){
        Permissions.askAsync(Permissions.CAMERA).then(this.onCameraPermission)
    }
    onCameraPermission = (status) => {
        this.setState({
            cameraPermission: status.status == 'granted'
        })
    }
    onFacesDetected = (faces) => {
        this.setState({
            faces : faces
        })
    }
    onFaceDetectionError = (error) => {
        console.log(error)
    }
    render(){
        const {cam_per_state} = this.state.cameraPermission

        if(cam_per_state === null){
            return <View/>
        }
        if(cam_per_state === false){
            return(
                <View style ={styles.container}>
                    <Text>No access to Camera</Text>
                </View>
            )
        }
        console.log(this.state.faces)
        return(
            <View style = {styles.container}>
                <SafeAreaView style ={styles.droidSafeArea} />
            <View style= {styles.headingContainer} >
                <Text style = {styles.titleText}>Frapp</Text>
            </View>
            <View style = {styles.cameraStyle} >
            <Camera style ={{flex : 1}} type = {Camera.Constants.Type.front} 
            faceDetectorSettings = {{
                mode: FaceDetector.Constants.Mode.Fast,
                detectLandmark : FaceDetector.Constants.Landmark.all,
                runClassification: FaceDetector.Constants.Classifications.all
            }}
            onFacesDetected ={
                this.onFacesDetected
            }
            onFaceDetectionError = {
                this.onFaceDetectionError
            }
            />
        
            </View>
            <View style = {styles.filterContainer} >
                
            </View>
            <View style = {styles.actionContainer}>
                
            </View>
            </View>
        )
    }
}












//StyleSheet
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    headingContainer: {
        flex: 0.1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleText: {
        fontSize: 30
    },
    cameraStyle: {
        flex: 0.65
    },
    filterContainer: {},
    actionContainer: {}
});