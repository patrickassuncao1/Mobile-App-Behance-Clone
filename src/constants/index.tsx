import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';


export const typesService = [
    {
        icon: <FontAwesome name="cutlery" size={25} color="black" />,
        name: 'Pratos',
        key: 1
    },
    {
        icon: <MaterialIcons name="local-drink" size={25} color="black" />,
        name: 'Bebidas',
        key: 2
    },
    {
        icon: <FontAwesome5 name="pizza-slice" size={25} color="black" />,
        name: 'Pizzas',
        key: 4
    },
    {
        icon: <MaterialIcons name="cake" size={25} color="black" />,
        name: 'Sobremesas',
        key: 5
    }
]

export const restaurants = [
    {
        name: 'Restaurante 1',
        distance: '3km',
        timer: '15min',
        stars: '4.8',
        image: require('../../assets/images/restaurant1.jpg'),
        key: 1
    },
    {
        name: 'Restaurante 2',
        distance: '10km',
        timer: '1h',
        stars: '3.8',
        image: require('../../assets/images/restaurant2.jpg'),
        key: 2
    },
    {
        name: 'Restaurante 3',
        distance: '20km',
        timer: '2h',
        stars: '5.8',
        image: require('../../assets/images/restaurant3.jpg'),
        key: 3
    }

]

export const slideImages = [
    { img: require('../../assets/images/img1.jpg'), id: 1 },
    { img: require('../../assets/images/img2.jpg'), id: 2 },
    { img: require('../../assets/images/img3.jpg'), id: 3 },
]

export const listImages = [
    {
        img: require('../../assets/images/eat1.jpg'),
        name: 'Pizza',
        price:'20,00',
        id: 1
    },
    {
        img: require('../../assets/images/eat2.jpg'),
        name: 'Cereal',
        price:'15,00',
        id: 2
    },
    {
        img: require('../../assets/images/eat3.jpg'),
        name: 'Salada',
        price:'18,00',
        id: 3
    },
]
