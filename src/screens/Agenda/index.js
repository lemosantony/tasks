import React, { Component } from 'react'

import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  FlatList,
  TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import 'moment/locale/pt-br'

import Task from '../../components/Task'

import styles from './styles'

import todayImage from '../../../assets/imgs/today.jpg'
import commonStyles from '../../commonStyles'

export default class Agenda extends Component {
  state = {
    tasks: [
      {
        id: Math.random(),
        desc: 'Comprar curso do React Native',
        estimateAt: new Date(),
        doneAt: new Date()
      },
      {
        id: Math.random(),
        desc: 'Concluir o curso',
        estimateAt: new Date(),
        doneAt: null
      },
      {
        id: Math.random(),
        desc: 'Comprar curso do React Native',
        estimateAt: new Date(),
        doneAt: new Date()
      },
      {
        id: Math.random(),
        desc: 'Concluir o curso',
        estimateAt: new Date(),
        doneAt: null
      },
      {
        id: Math.random(),
        desc: 'Comprar curso do React Native',
        estimateAt: new Date(),
        doneAt: new Date()
      },
      {
        id: Math.random(),
        desc: 'Concluir o curso',
        estimateAt: new Date(),
        doneAt: null
      },
      {
        id: Math.random(),
        desc: 'Comprar curso do React Native',
        estimateAt: new Date(),
        doneAt: new Date()
      },
      {
        id: Math.random(),
        desc: 'Concluir o curso',
        estimateAt: new Date(),
        doneAt: null
      },
      {
        id: Math.random(),
        desc: 'Comprar curso do React Native',
        estimateAt: new Date(),
        doneAt: new Date()
      },
      {
        id: Math.random(),
        desc: 'Concluir o curso',
        estimateAt: new Date(),
        doneAt: null
      },
      {
        id: Math.random(),
        desc: 'Comprar curso do React Native',
        estimateAt: new Date(),
        doneAt: new Date()
      },
      {
        id: Math.random(),
        desc: 'Concluir o curso',
        estimateAt: new Date(),
        doneAt: null
      },
    ],
    visibleTasks: [],
    showDoneTasks: true,
  }

  filterTasks = () => {
    let visibleTasks = null
    if (this.state.showDoneTasks) {
      visibleTasks = [...this.state.tasks]
    } else {
      const pending = task => task.doneAt === null
      visibleTasks = this.state.tasks.filter(pending)
    }
    this.setState({ visibleTasks })
  }

  toggleFilter = () => {
    this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTasks)
  }

  componentDidMount = () => {
    this.filterTasks()
  }

  toggleTask = id => {
    const tasks = this.state.tasks.map(task => {
      if (task.id === id) {
        task = { ...task }
        task.doneAt = task.doneAt ? null : new Date()
      }
      return task
    })
    this.setState({ tasks }, this.filterTasks)
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={commonStyles.colors.today}
        />
        <ImageBackground
          source={todayImage}
          style={styles.background}
        >
          <View style={styles.iconBar}>
            <TouchableOpacity onPress={this.toggleFilter}>
              <Icon
                name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
                size={20}
                color={commonStyles.colors.secondary}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.titleBar}>
            <Text style={styles.title}>Hoje</Text>
            <Text style={styles.subtitle}>{moment().locale('pt-br').format('ddd, D [de] MMMM')}</Text>
          </View>
        </ImageBackground>
        <View style={styles.taskContainer}>
          <FlatList
            data={this.state.visibleTasks}
            keyExtractor={item => `${item.id}`}
            renderItem={({ item }) => <Task {...item} toggleTask={this.toggleTask} />}
          />
        </View>
      </View>
    )
  }
}