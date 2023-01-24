import React, { useEffect, useRef, useState } from "react";
// import { useSelector, useDispatch } from 'react-redux';
import { Dimensions, FlatList, Image, Pressable, ScrollView, Text, TextInput, View, ActivityIndicator } from "react-native";
import axios from 'axios';
import { Modalize } from "react-native-modalize";
import { ModalPoke } from "./ModalPoke";
import { ItemPokemon } from "./components/ItemPokemons";
// import { RootState } from "../store";
// import { limitPokemons, setData } from "../store/store";

const { width, height } = Dimensions.get("window");

export function Teste() {
    
    const modalTeste = useRef(null); 
    // const allpokemons = useSelector((state: RootState) => state.pokemons)
    // const dispatch = useDispatch();
    const [text, setText] = useState("");
    const [rende, setRende] = useState(21);
    const [loading, setLoading] = useState(false);
    const [pokemonModal, setPokemonModal] = useState<any>();
    const [show, setShow] = useState(false);
    const [pokemons, setPokemons] = useState<any>([]);
    const [allpokemons, setAllPokemons] = useState<any>([]);
    
    useEffect(() => {
        setLoading(false)
        if (text === "") {
            setPokemons(allpokemons.slice(0,rende));
        }
        setLoading(true)
    },[text, rende])

    useEffect(() => {
        getPokemons();
    },[])


    const getPokemons = () => {
        setLoading(false)
        var endpoints = [];
        for (let i = 1; i < 200; i++) {
            endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}`);
        }
        var response = axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then((res) => {setAllPokemons(res), setPokemons(res.slice(0, 21))});
        setLoading(true);
    }

    function OpenModal(pokemon: any) {
        setPokemonModal(pokemon)
        setShow(true);
    }

    // function Mais() {
    //     setRende(rende + 19);
    //     getPokemons();
    // }

    function SearchPokemon(text: string) {
        if (text.includes("#")) {
            var newText = text.substring(1);
            const res = allpokemons.filter((item: any) => {
                if (item.data.id === parseInt(newText)) {
                    return {...item}
                }
            })
            setPokemons(res);
        }else{
            const res = allpokemons.filter((item: any) => {
                if (item.data.name.includes(text.toLowerCase())) {
                    return {...item}
                }
            })
            setPokemons(res);
        }
    }

    // console.log(1);


    return(
        <>
            <View style={{ backgroundColor: "#f2f2f2", flex: 1 }}>
                <View style={{ flexDirection: 'row', paddingBottom: 24,  backgroundColor: "#E30B0B", paddingHorizontal: 12, paddingTop: 32 }}>

                    <View style={{ position: 'absolute', backgroundColor: '#AA0C0C', left: 100, top: 150, zIndex: 999, width: 200, height: 10, transform:[
                        { rotateZ: "-50deg" }
                    ] }} />
                    <View style={{ position: 'absolute', backgroundColor: '#AA0C0C', left: 261, top: 76, zIndex: 999, width: 200, height: 10,  }} />

                    <View style={{ justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                        <View style={{ width: 70, height: 70, backgroundColor: "#f2f2f2", borderRadius: 70,  }} />
                        <View style={{ width: 60, height: 60, backgroundColor: "#105CF3", borderRadius: 60, position: 'absolute', }} />
                        <View style={{ width: 42, height: 42, backgroundColor: "rgba(38, 73, 144, .6)", borderRadius: 40, position: 'absolute', top: 20, left: 20 }} />
                        <View style={{ width: 20, height: 20, backgroundColor: "rgba(242, 242, 242, .5)", borderRadius: 20, position: 'absolute',  left: 12, top: 20 }} />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: 16, height: 16, borderRadius: 20, backgroundColor: "#BD0909", marginLeft: 8 }} />
                        <View style={{ width: 16, height: 16, borderRadius: 20, backgroundColor: "yellow", marginLeft: 8 }} />
                        <View style={{ width: 16, height: 16, borderRadius: 20, backgroundColor: "green", marginLeft: 8 }} />
                    </View>
                </View>
                <View style={{ paddingHorizontal: 24, paddingVertical: 12, zIndex: 999, backgroundColor: '#f2f2f2'  }}>
                    <View style={{ backgroundColor: '#585858', borderRadius: 4, height: 40, paddingLeft: 12 }}>
                        <TextInput 
                            style={{ flex: 1 }}
                            placeholder='Pesquisa...'
                            onChangeText={(text) => setText(text)}
                            placeholderTextColor="#f2f2f2"
                            onSubmitEditing={() => SearchPokemon(text)}
                        />
                    </View>
                </View>
                {loading ?  
                    <ScrollView style={{ backgroundColor: "#f2f2f2", width: '100%' }}>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', paddingLeft: 16, paddingBottom: 24 }}>
                            {pokemons.map(( item: any ) => {
                                return(
                                    <ItemPokemon 
                                        item={item}
                                        modal={() => OpenModal(item)}
                                    />
                                );
                            })}
                        </View>
                        <Pressable onPress={() => setRende(rende + 21)} style={{ backgroundColor: "red", width: '100%', height: 50 }}>
                            <Text>Mais</Text>
                        </Pressable>
                    </ScrollView>
                : 
                    <View style={{ flex: 1, backgroundColor: '#f2f2f2', height: height, paddingTop: 20 }}>
                        <ActivityIndicator size='large' />
                    </View> 
                }
            </View>
            {pokemonModal ? 
                <ModalPoke 
                    data={pokemonModal}
                    show={show}
                    close={() => setShow(!show)}
                />
            : null }
        </>
    );
}