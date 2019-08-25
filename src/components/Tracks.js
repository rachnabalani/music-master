import React , { Component } from 'react';

class Tracks extends Component {
    
    state = { playing: false, audio: null, playingPreview: null };
    

    playAudio = preview_url => () => {

        const audio = new Audio(preview_url);
        if(preview_url){
        if(!this.state.playing) {
            audio.play();
            this.setState({ playing : true, audio, playingPreview: preview_url});
        }else{
            this.state.audio.pause();
            
            if(this.state.playingPreview === preview_url){
                this.setState({ playing: false });
            }else{
                audio.play();
                this.setState({ audio, playingPreview: preview_url}); 
            }

            
        }
        }else{
        console.log('No preview for this track');
        }
    }

    trackIcon = track => {

        if(!track.preview_url) {
            return <span>N/A</span>;
        }

        if(
            this.state.playing && 
            this.state.playingPreview === track.preview_url
        ) 
        { 
            return <span> | | </span>;  
        }

        return <p>&#9654;</p>;
    }
    

    render() {
    const { tracks } = this.props;

        return (
            <div>
            {
                tracks.map( track => {
                    const { id, name, album, preview_url } = track;

                    return (
                        <div 
                        key={id} 
                        onClick={this.playAudio(preview_url)}
                        className='track'
                        >
                        <img 
                        src={album.images[0].url} 
                        alt='track-image'
                        className='track-image' 
                        />
                        <p className='track-text'> {name} </p>
                        <p className='track-icon'>{this.trackIcon(track)}</p>
                        </div>
                    )
                })    
            }
            </div>
        )
    }
}

export default Tracks;