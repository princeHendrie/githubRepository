import React, {Component} from 'react';
import {Text, Image, View, TouchableOpacity, FlatList, ActivityIndicator, BackHandler} from 'react-native';
import { Input, Header, Icon, Card, Thumbnail, CardItem} from 'native-base';
import styles from '../../values/styles';
import color from '../../values/colors';
import { Actions } from 'react-native-router-flux';
import {connect} from 'react-redux';
import {searchChanged, searchRepository, searchFirstTime, loadmore} from '../../actions/HomeActions';
import Moment from 'moment';


var Spinner = require('react-native-spinkit');

class Home extends Component {

    constructor(props){
        super(props);
        this.state = { searchTemp: '', dataSource: []}
        this.page = 1;
        this.defaultSearch = "facebook/react-native"
     }

     componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
      }

    componentWillMount(){
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
        this.setState({ searchTemp: this.defaultSearch })
        this.props.searchFirstTime(this.defaultSearch);
    }

    componentWillReceiveProps(newProps){
        if(newProps.listSearch != this.props.listSearch){
            if(newProps.listSearch.length > 0){
                this.setState({ dataSource: this.state.dataSource.concat(newProps.listSearch) })
            }else{
                this.setState({ dataSource: [] })
            }
            
        } 
     }

     handleBackButton() {
        return true;
      }

    logoutFunction=()=>{
        Actions.pop();
    }


    onSearchChange(text) {
        this.props.searchChanged(text);
    }

    searchFunction(){
        this.setState({ searchTemp: this.props.search, dataSource: [] })
        const { search } = this.props;
        this.props.searchRepository({search});
    }

    renderError() {
        if(this.props.error) {
            return (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>
                            {this.props.error}
                        </Text>
                    </View>
            );
        }
    }


    loadMoreData = () => {
        this.page = this.page + 1;
        this.props.loadmore(this.state.searchTemp,this.page);

    };
   
    renderButtonLoadMore() {
        if(!this.props.loading && this.props.listSearch.length > 0 && this.props.listSearch.length == 100) {
            return (
                <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={this.loadMoreData}
                        //On Click of button calling loadMoreData function to load more data
                        style={styles.loadMoreBtn}>
                        <Text style={styles.loadmoreBtnText}>Load More</Text>
                        {this.props.loadingLoadmore ? (
                        <ActivityIndicator color={color.white} style={{ marginLeft: 8 }} />
                        ) : null}
              </TouchableOpacity>
            );
        }
    }

    renderFooter() {
        return (
        //Footer View with Load More button
          <View style={styles.footer}>

                {this.renderButtonLoadMore()} 

          </View>
        );
      }

    render() {
        return (
            
                <View style={styles.container}>
                    <Card style={styles.card} >
                            <Header style={styles.header} searchBar rounded>
                                    <Icon style={styles.iconSearch} name='ios-search'/>
                                    <Input style={styles.inputSearch} 
                                           placeholder="Github Repository ex: facebook/react-native" 
                                           placeholderTextColor= {color.grey}
                                           returnKeyType="done"
                                           onChangeText={this.onSearchChange.bind(this)}
                                           onSubmitEditing={this.searchFunction.bind(this)}
                                           value={this.props.search}
                                            />
                            </Header>
                    </Card> 

                    <Spinner 
                            style={styles.spinnerKotak} 
                            isVisible={this.props.loading} size={56} type='FadingCircle' color={color.green}/>
                    

                    {this.renderError()} 

                    <FlatList
                            data={this.state.dataSource}
                            showsVerticalScrollIndicator={false}
                            renderItem={({item}) =>
                            
                            <View style={styles.flatview}>
                            
                                <CardItem style={styles.cardList}>
                                <Text style={styles.titleList}>{item.message}</Text>
                                <View style={styles.infoList}>
                                    <Thumbnail small resizeMode={'stretch'}  source={{ uri: item.avatarAuthorUrl }}/>
                                    <Thumbnail small resizeMode={'stretch'}  source={{ uri: item.avatarCommitterUrl }}/>
                                </View>
                                <View style={styles.infoList}>
                                    <Text>{item.authorName} authored and {item.committerName} committed {Moment(item.committerDate).format('MMMM Do YYYY, h:mm:ss a')} </Text>
                                </View>

                                
                            

                                </CardItem>
                        
                            </View>
                            
                            }
                            ListFooterComponent={this.renderFooter.bind(this)}
                            //Adding Load More button as footer component
                            keyExtractor={item => item.nodeId}
                    />

                        <TouchableOpacity activeOpacity={0.5} onPress={this.logoutFunction} style={styles.TouchableOpacityStyle} >
                        
                        <Image source={require('../../images/logout.png')} 
                        
                                style={styles.FloatingButtonStyle} />

                        </TouchableOpacity>

                    
                </View>
            
        );
    }
}

const mapStateToProps = ({ home }) => {
    const { search, listSearch, password, error, loading, loadingLoadmore } = home;

    return { search, listSearch, password, error, loading, loadingLoadmore };
};

export default connect(mapStateToProps, { searchChanged, searchRepository, searchFirstTime, loadmore }) (Home);