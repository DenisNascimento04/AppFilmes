import React, { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, Image, Pressable, ScrollView, Text, TextInput, View, TouchableOpacity } from "react-native";
import axios from 'axios';
import { Modalize } from "react-native-modalize";

const { width, height } = Dimensions.get("window");

type Props = {
    modal: () => void,
    item: any
}

export function ItemPokemon({ item, modal }: Props) {
    return(
        <TouchableOpacity key={item.data.id} onPress={modal} style={{ backgroundColor:
            item.data.types[0].type.name === "grass" ? 'rgba(31, 227, 84, .3)' : 
            item.data.types[0].type.name === "fire" ? 'rgba(227, 154, 28, .3)' : 
            item.data.types[0].type.name === "water" ? 'rgba(28, 185, 227, .3)' : 
            item.data.types[0].type.name === "bug" ? 'rgba(167, 227, 28, 0.3)' : 
            item.data.types[0].type.name === "ground" ? 'rgba(224, 198, 31, .3)' : 
            item.data.types[0].type.name === "electric" ? 'rgba(224, 227, 28, .3)' : 
            item.data.types[0].type.name === "poison" ? 'rgba(151, 31, 224, .3)' : 
            item.data.types[0].type.name === "fighting" ? 'rgba(224, 69, 31, .3)' : 
            item.data.types[0].type.name === "fairy" ? 'rgba(247, 41, 210, .3)' : 
            item.data.types[0].type.name === "normal" ? 'rgba(206, 209, 200, .3)' : "#f2f2f2",
            paddingHorizontal: 12, paddingVertical: 8, alignItems: 'center', borderRadius: 8, marginRight: 6, marginVertical: 4, width: 120 }}
        >
            <View style={{ position: 'absolute', width: 80, height: 80, borderRadius: 80, top: 20,
                backgroundColor: 
                item.data.types[0].type.name === "grass" ? 'rgba(31, 227, 84, .5)' : 
                item.data.types[0].type.name === "fire" ? 'rgba(227, 154, 28, .5)' : 
                item.data.types[0].type.name === "water" ? 'rgba(28, 185, 227, .5)' : 
                item.data.types[0].type.name === "bug" ? 'rgba(167, 227, 28, .5)' : 
                item.data.types[0].type.name === "ground" ? 'rgba(224, 198, 31, .5)' : 
                item.data.types[0].type.name === "electric" ? 'rgba(224, 227, 28, .5)' : 
                item.data.types[0].type.name === "poison" ? 'rgba(151, 31, 224, .5)' : 
                item.data.types[0].type.name === "fighting" ? 'rgba(224, 69, 31, .5)' :
                item.data.types[0].type.name === "fairy" ? 'rgba(247, 41, 210, .5)' :
                item.data.types[0].type.name === "normal" ? 'rgba(206, 209, 200, .3)' : "#f2f2f2",
            }} />
            
            <Image source={{ uri: item.data.sprites.front_default }} style={{ width: 100, height: 100 }} />
            <Text style={{ fontSize: 12, backgroundColor: "rgba(114, 112, 112, .3)", paddingHorizontal: 4, paddingVertical: 2, borderRadius: 4, marginVertical: 6 }}>
                #{item.data.id}
            </Text>
            <Text style={{ fontWeight: '700', marginBottom: 4 }}>{item.data.name[0].toUpperCase() + item.data.name.substring(1)}</Text>
            <View style={{ flexDirection: 'row', marginBottom: 6 }}>
                <Text style={{ marginRight: 4, fontSize: 12 }}>Tipo</Text>
                {item.data.types.map((item2: any, index: number) => (
                    <Text key={index} style={{ fontSize: 12 }}>
                        {item2.type.name[0].toUpperCase() + item2.type.name.substring(1)}
                        {item.data.types.length-1 != index ? "/": null}
                    </Text>
                ))}
            </View>
        </TouchableOpacity>
    );
}