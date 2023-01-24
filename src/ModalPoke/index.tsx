import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, ScrollView, Text, View, Animated, Pressable } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import { Modalize } from "react-native-modalize";

import { styles } from "./styles";

const { height } = Dimensions.get('screen');

type Props = {
    data: any,
    show: boolean,
    close: () => void
}

export function ModalPoke( {data, show, close}: Props ){

    const [statusModal, setStatusModal] = useState({
        container: new Animated.Value(height),
        opacity: new Animated.Value(0),
        modal: new Animated.Value(height),
    });

    const openModal = () => {
        Animated.sequence([
            Animated.timing(statusModal.container, { toValue: 0, duration: 0, useNativeDriver: true }),
            Animated.timing(statusModal.opacity, { toValue: 1, duration: 0, useNativeDriver: true }),
            Animated.spring(statusModal.modal, { toValue: 0, bounciness: 0, useNativeDriver: true })
        ]).start()
      }

    const closeModal = () => {
        Animated.sequence([
            Animated.timing(statusModal.modal, { toValue: height, duration: 100, useNativeDriver: true }),
            Animated.timing(statusModal.opacity, { toValue: 0, duration: 100 , useNativeDriver: true}),
            Animated.timing(statusModal.container, { toValue: height, duration: 100, useNativeDriver: true })
        ]).start()
    }

    useEffect(()=>{
        if(show){
            openModal()
        }else{
            closeModal()
        }
    }, [show])


    return(
        <Animated.View 
            style={[styles.Modal, { 
                opacity: statusModal.opacity,
                transform: [
                    {translateY: statusModal.container}
                ]
            }]}
        >
            <Animated.View 
            style={[styles.contentModal, {
                transform: [
                    {translateY: statusModal.modal}
                ]
            }]}
            >
                <View style={{ backgroundColor: "#f2f2f2", alignItems: 'center', justifyContent: "center", flexDirection: 'row' }}>

                    <View style={{ paddingRight: 40 }}>
                        <Image source={{ uri: data.data.sprites.front_default }} style={{ width: 160, height: 160, position: 'absolute', zIndex: 2, top: 20, left: -10 }} />
                        <View style={{ 
                            backgroundColor: 
                                data.data.types[0].type.name === "grass" ? 'rgba(31, 227, 84, .5)' : 
                                data.data.types[0].type.name === "fire" ? 'rgba(227, 154, 28, .5)' : 
                                data.data.types[0].type.name === "water" ? 'rgba(28, 185, 227, .5)' : 
                                data.data.types[0].type.name === "bug" ? 'rgba(167, 227, 28, .5)' : 
                                data.data.types[0].type.name === "ground" ? 'rgba(224, 198, 31, .5)' : 
                                data.data.types[0].type.name === "electric" ? 'rgba(224, 227, 28, .5)' : 
                                data.data.types[0].type.name === "poison" ? 'rgba(151, 31, 224, .5)' : 
                                data.data.types[0].type.name === "fighting" ? 'rgba(224, 69, 31, .5)' :
                                data.data.types[0].type.name === "fairy" ? 'rgba(247, 41, 210, .5)' :
                                data.data.types[0].type.name === "normal" ? 'rgba(206, 209, 200, .3)' : "#f2f2f2",
                            height: '100%', width: 100
                         }} />
                         <View 
                            style={{ position: 'absolute', width: 200, height: 200, borderWidth: 20, borderRadius: 100, top: 110, left: -160,
                                borderColor: 
                                    data.data.types[0].type.name === "grass" ? 'rgba(31, 227, 84, .4)' : 
                                    data.data.types[0].type.name === "fire" ? 'rgba(227, 154, 28, .4)' : 
                                    data.data.types[0].type.name === "water" ? 'rgba(28, 185, 227, .4)' : 
                                    data.data.types[0].type.name === "bug" ? 'rgba(167, 227, 28, .4)' : 
                                    data.data.types[0].type.name === "ground" ? 'rgba(224, 198, 31, .4)' : 
                                    data.data.types[0].type.name === "electric" ? 'rgba(224, 227, 28, .4)' : 
                                    data.data.types[0].type.name === "poison" ? 'rgba(151, 31, 224, .4)' : 
                                    data.data.types[0].type.name === "fighting" ? 'rgba(224, 69, 31, .4)' :
                                    data.data.types[0].type.name === "fairy" ? 'rgba(247, 41, 210, .4)' :
                                    data.data.types[0].type.name === "normal" ? 'rgba(206, 209, 200, .4)' : "#f2f2f2",
                            }}
                         />
                         <View 
                            style={{ position: 'absolute', width: 250, height: 250, borderWidth: 20, borderRadius: 300, top: 85, left: -160,
                                borderColor: 
                                    data.data.types[0].type.name === "grass" ? 'rgba(31, 227, 84, .4)' : 
                                    data.data.types[0].type.name === "fire" ? 'rgba(227, 154, 28, .4)' : 
                                    data.data.types[0].type.name === "water" ? 'rgba(28, 185, 227, .4)' : 
                                    data.data.types[0].type.name === "bug" ? 'rgba(167, 227, 28, .4)' : 
                                    data.data.types[0].type.name === "ground" ? 'rgba(224, 198, 31, .4)' : 
                                    data.data.types[0].type.name === "electric" ? 'rgba(224, 227, 28, .4)' : 
                                    data.data.types[0].type.name === "poison" ? 'rgba(151, 31, 224, .4)' : 
                                    data.data.types[0].type.name === "fighting" ? 'rgba(224, 69, 31, .4)' :
                                    data.data.types[0].type.name === "fairy" ? 'rgba(247, 41, 210, .4)' :
                                    data.data.types[0].type.name === "normal" ? 'rgba(206, 209, 200, .4)' : "#f2f2f2",
                            }}
                         />
                    </View>

                    <View style={{ height: "100%", paddingTop: 16, paddingRight: 40 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 24, fontWeight: '700' }}>
                                {data.data.name[0].toUpperCase() + data.data.name.substring(1)}
                            </Text>
                            <Text style={{ fontSize: 16 }}>
                                #{data.data.id}
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 4, marginBottom: 16}}>
                            {data.data.types.map((item2: any, index: number) => (
                                <View key={index}  style={{ 
                                    backgroundColor: 
                                        item2.type.name === "grass" ? 'rgba(31, 227, 84, .2)' : 
                                        item2.type.name === "fire" ? 'rgba(227, 154, 28, .2)' : 
                                        item2.type.name === "water" ? 'rgba(28, 185, 227, .2)' : 
                                        item2.type.name === "bug" ? 'rgba(167, 227, 28, .2)' : 
                                        item2.type.name === "ground" ? 'rgba(224, 198, 31, .2)' : 
                                        item2.type.name === "electric" ? 'rgba(224, 227, 28, .2)' : 
                                        item2.type.name === "poison" ? 'rgba(151, 31, 224, .2)' : 
                                        item2.type.name === "fighting" ? 'rgba(224, 69, 31, .2)' :
                                        item2.type.name === "fairy" ? 'rgba(247, 41, 210, .2)' :
                                        item2.type.name === "normal" ? 'rgba(206, 209, 200, .2)' : "#f2f2f2",
                                    paddingHorizontal: 8,
                                    paddingVertical: 6,
                                    borderRadius: 4,
                                    marginRight: 4 
                                }}>
                                    <Text style={{ fontSize: 14, fontWeight: '700',
                                        color: 
                                            item2.type.name === "grass" ? 'rgba(31, 227, 84, 1)' : 
                                            item2.type.name === "fire" ? 'rgba(227, 154, 28, 1)' : 
                                            item2.type.name === "water" ? 'rgba(28, 185, 227, 1)' : 
                                            item2.type.name === "bug" ? 'rgba(167, 227, 28, 1)' : 
                                            item2.type.name === "ground" ? 'rgba(224, 198, 31, 1)' : 
                                            item2.type.name === "electric" ? 'rgba(224, 227, 28, 1)' : 
                                            item2.type.name === "poison" ? 'rgba(151, 31, 224, 1)' : 
                                            item2.type.name === "fighting" ? 'rgba(224, 69, 31, 1)' :
                                            item2.type.name === "fairy" ? 'rgba(247, 41, 210, 1)' :
                                            item2.type.name === "normal" ? 'rgba(206, 209, 200, 1)' : "#f2f2f2", 
                                    }}>
                                        {item2.type.name[0].toUpperCase() + item2.type.name.substring(1)}
                                    </Text>
                                </View>
                            ))}
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 24, }}>
                            <View style={{ marginRight: 12 }}>
                                <Text style={{ fontSize: 12, color: '#585858' }}>Altura</Text>
                                <Text style={{ fontSize: 12, fontWeight: '700' }}>{parseFloat(data.data.height) / 10}m</Text>
                            </View>
                            <View style={{ marginRight: 12 }}>
                                <Text style={{ fontSize: 12, color: '#585858' }}>Peso</Text>
                                <Text style={{ fontSize: 12, fontWeight: '700' }}>{parseFloat(data.data.weight) / 10}kg</Text>
                            </View>
                            <View style={{ }}>
                                <Text style={{ fontSize: 12, color: '#585858' }}>Habilidades</Text>
                                <Text style={{ fontSize: 12, fontWeight: '700' }}>
                                    {/* {data.data.abilities[0].ability.name} */}
                                    {data.data.abilities[0].ability.name[0].toUpperCase() + data.data.abilities[0].ability.name.substring(1)}
                                </Text>
                            </View>
                        </View>
                        {data.data.stats.map((item: any, index: number) => (
                            <View key={index} style={{ marginBottom: 6 }}>
                                <Text>{item.stat.name}</Text>
                                <View style={{ marginTop: 4 }}>
                                    <View style={{ position: 'absolute', borderRadius: 2, backgroundColor: "rgba(176, 176, 176, .4)", width: '100%', height: 5 }} />
                                    <View style={{ position: 'absolute', borderRadius: 2, backgroundColor: "green", 
                                        width: item.base_stat >= 100 ? "100%" : item.base_stat.toString() + "%", 
                                        height: 5 
                                    }} />
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </Animated.View>
            <Pressable onPress={close} style={{ padding: 8, backgroundColor: "#f2f2f2", borderRadius: 4, position: "absolute", left: 320, top: 170 }}>
                <AntDesign name="close" color='#121213' size={16} />
            </Pressable>
        </Animated.View>
    );
}