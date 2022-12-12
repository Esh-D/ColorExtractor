import React, {useState} from 'react';
import { StyleSheet, View, Text, Image, TouchableHighlight, FlatList} from 'react-native';
import { Button } from 'react-native-paper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// @ts-ignore
//import PixelColor from 'react-native-pixel-color';
//import GetPixelColor from 'react-native-get-pixel-color';
//import Expo from 'expo';
//import ExpoPixi, { PIXI } from 'expo-pixi';
//import { getPixelRGBA } from 'react-native-get-pixel';
//import Canvas from 'react-native-canvas';
import ImageColors from 'react-native-image-colors'


const ImageSelector = ({ navigation }) => {
    const [colorBoxes, setColorBoxes] = useState('');
    const [imageUri, setImageUri] = useState('');

    const openGallery = () => {
        const options = {
            mediaType: 'photo',
        }
        
        launchImageLibrary(options, response => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                //const source = {url: 'data:image/jpeg;base64,' + response.base64};
                setImageUri(response.assets[0].uri);
                console.log(response);
            }
        })
    }
    
    const openCamera = () => {
        const options = {
            mediaType: 'photo',
        }
        
        launchCamera(options, response => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                //const source = {url: 'data:image/jpeg;base64,' + response.base64};
                setImageUri(response.assets[0].uri);
                console.log(response);
            }
        })
    }

    const getColorPalette = (colorSwatches) => {

    }

    const getColors = async () => {
        const uri = imageUri;

        const result = await ImageColors.getColors(uri, {
            fallback: '#228B22',
            cache: true,
            key: 'unique_key',
        })

        switch (result.platform) {
        case 'android':
            // android result properties
            //console.log(result);
            var fields = [result.vibrant, result.dominant, result.average, result.vibrant, result.darkVibrant, result.lightVibrant, result.darkMuted, result.lightMuted, result.muted, result.platform];
            var colors = [];
            for (let i = 0; i < fields.length; i++) {
                if (fields[i] !== "android" && !colors.includes(fields[i])){
                    colors.push(fields[i]);
                    //setColorBoxes(fields[i]);
                    console.log(fields[i]);
                }
            }

            var cbs = colors.map((color) => {
                return (
                <View>
                    <Text>{color}</Text>
                    <View style={{backgroundColor: color, width: '55px', height: '30px'}} />
                </View>
                )
            })
            
            //console.log(cbs);
            setColorBoxes(cbs);   
            break
        case 'web':
            // web result properties
            console.log(result);
            var fields = [result.vibrant, result.dominant, result.vibrant, result.darkVibrant, result.lightVibrant, result.darkMuted, result.lightMuted, result.muted, result.platform];
            var colors = [];
            for (let i = 0; i < fields.length; i++) {
                if (fields[i] !== "web" && !colors.includes(fields[i])){
                    colors.push(fields[i]);
                    //setColorBoxes(fields[i]);
                    console.log(fields[i]);
                }
            }

            var cbs = colors.map((color) => {
                return (
                <View>
                    <Text>{color}</Text>
                    <View style={{backgroundColor: color, width: '55px', height: '30px'}} />
                </View>
                )
            })
            
            //console.log(cbs);
            setColorBoxes(cbs);            
            break
        case 'ios':
            // iOS result properties
            var fields = [result.background, result.primary, result.secondary, result.detail];
            var colors = [];
            for (let i = 0; i < fields.length; i++) {
                if (fields[i] !== "ios" && !colors.includes(fields[i])){
                    colors.push(fields[i]);
                    //setColorBoxes(fields[i]);
                    //console.log(fields[i]);
                }
            }

            var cbs = colors.map((color) => {
                return (
                <View>
                    <Text>{color}</Text>
                    <View style={{backgroundColor: color, width: '55px', height: '30px'}} />
                </View>
                )
            })
            
            //console.log(cbs);
            setColorBoxes(cbs);  
            break
        default:
            throw new Error('Unexpected platform key')
        }
    };

    return (
        <View style={styles.container}>
            {colorBoxes && 
            <View style={{flexDirection: 'row', gap: '20px', maxWidth: "300px", flexWrap: 'wrap', justifyContent: 'center', backgroundColor: '#fff', padding: '8px', borderRadius: '5px'}}>
                {colorBoxes}
            </View>}

            {imageUri && 
                <Image 
                    source={{uri: imageUri}} 
                    style={{width: '300px', height: '300px', borderStyle: 'solid'}} 
                    />}
            {imageUri && 
                <Button icon="palette" mode="contained" style={styles.button} buttonColor="#3C7A89" onPress={getColors}>
                    Reveal Colors
                </Button>}

            {!imageUri && <Button icon="camera" mode="contained" style={styles.button} buttonColor="#3C7A89" onPress={openCamera}>
                Open Camera
            </Button>}
            {!imageUri && <Button icon="image" mode="contained" style={styles.button} buttonColor="#3C7A89" onPress={openGallery}>
                Select Image
            </Button>}
            {imageUri && <Button icon="home" mode="contained" style={styles.button} buttonColor="#3C7A89" onPress={() => {
                setColorBoxes('');
                setImageUri('');
                navigation.navigate('Home');
            }}>
                Home
            </Button>}    
        </View>
    )
}

export default ImageSelector;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ED6A5E',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '20px'
    },
    button: {
      width: '200px',
    }
  });
  


        /*const image = new Image();
        image.src = imageUri;
        console.log(image);

        const image2 = new Image(canvas, image.height, image.width);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);

        const imageData = ctx.getImageData(0, 0, image.width, image.height);
        console.log(imageData);
*/
        /*
        var canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;

        var context = canvas.getContext('2d');
        context.drawImage(image, 0, 0);

        var imageData = context.getImageData(0, 0, canvas.width, canvas.height);

        var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
*/

        /*getPixelRGBA(imageUri, x, y)
            .then(color => console.log('hi')) // [243, 123, 0]
            .catch(err => {});*/
        /*const pixels = await readPixelsAsync(uri);
        console.log('cool', uri, pixels.length / 4);

        const getPixel = index => {
            const pixel = index * 4;
            return pixels.slice(pixel, pixel + 4);
        };

        const [r, g, b, a] = getPixel(0);
        console.log({ r, g, b, a });
        //console.log(`rgba(${r}, ${g}, ${b}, ${1.0 / 255 * a})`)
    */
        /*
        PixelColor.getHex({uri: imageUri}, { x, y }).then((color) => {
            console.log(color);
            // #000000
          }).catch((err) => {
            console.error(err);
            // Oops, something went wrong. Check that the filename is correct and
            // inspect err to get more details.
          });*/
          /*
          GetPixelColor.pickColorAt(x, y)
            .then((color) => {
                console.log(color);
                // HEX color value returned
            })
            .catch(err => {
                console.log(err);

                // Handle errors
            });*/



/*{imageUri && 
            <TouchableHighlight onPress={(evt) => {
                /*console.log(evt);
                console.log(evt.nativeEvent.layerX);
                console.log(evt.nativeEvent.layerY);
                const x = evt.nativeEvent.layerX;
                const y = evt.nativeEvent.layerY;
                */
                //setColors(getColors());
            // }}>
    //         {/*<Canvas ref={handleCanvas}/>*/}
    //         <Image 
    //             source={{uri: imageUri}} 
    //             style={{width: '300px', height: '300px', borderStyle: 'solid'}} 
    // />
    //     </TouchableHighlight>} 
    //     */






    //colors && 
                /*<FlatList 
                    data={colors}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
            />*/
                //<Text>{colors[0]}</Text>
                /*<View style={{flexDirection: 'row', gap: '20px'}}>
                    {colors.map((color) => {
                        return (
                            <>
                                <Text>{color}</Text>
                                <View style={{backgroundColor: color, width: '20px', height: '20px'}} />
                            </>
                        )
                    })}
                </View>
                */