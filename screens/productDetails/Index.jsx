import { View, Text, ActivityIndicator, Button, Modal, StyleSheet, Pressable, Alert, TextInput } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import ProductDetailItem from "../../components/ProductDetailsItem/Index";
import { Context } from "../../context";

export default function ProductDetail() {

    const route = useRoute();
    const navigation = useNavigation();
    const { productId } = route.params;
    console.log(route.params);

    const{addToFavourite} = useContext(Context);

    const [loading, setLoading] = useState(false);
    const [productDetailsData, setProductDetailData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false)
    const [reaseon, setReason] = useState('');

    useEffect(() => {

        setLoading(true);

        async function getDataFromAPI() {
            const apiRes = await fetch(`https://dummyjson.com/products/${productId}`);
            const finalResult = await apiRes.json();

            if (finalResult) {
                setLoading(false);
                setProductDetailData(finalResult);
            }
        }

        getDataFromAPI();

    }, [])

    const handleOnChange = (enteredText) => {
        setReason(enteredText);
    }

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return <Button onPress={() => setModalVisible(true)} title="Add Favourite" />
            }
        })
    })

    if (loading) {
        <ActivityIndicator size={"large"} color={"red"} />
    }

    return (
        <View>
            <ProductDetailItem productDetailsData={productDetailsData} />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TextInput
                            placeholder="What is your Reason?"
                            onPress={handleOnChange}
                            value={reaseon}
                            style={styles.reasonTextInput}
                        />
                        <View style={styles.buttonWrapper}>
                            <Pressable
                                style={[styles.button, styles.buttonOpen]}
                                onPress={() => {
                                    addToFavourite(productId, reaseon)
                                    // setModalVisible(!modalVisible)
                                }}>
                                <Text style={styles.textStyle}>Add</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>Close</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )

}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonWrapper:{
        flexDirection: 'row'
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 15
    },
    buttonClose: {
        backgroundColor: '#F194FF',
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
        marginRight: 30
    },
    buttonClose: {
        backgroundColor: 'grey',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    reasonTextInput:{
        borderRadius: 1,
        borderWidth: 1,
        padding:10,
    }
})