let React = require('react');

class TitleCanvas extends React.Component{
    constructor(props) {
        super(props)
        this.state = { color: 'rgb(79, 155, 218)'}
    
        this._resizeHandler = () => {
            /* Allows CSS to determine size of canvas */
            this.canvas.width = window.outerWidth;
            this.canvas.height = window.outerHeight/5;
            this.clearAndDraw();
        }
        
    }

    componentDidMount(){
        window.addEventListener('resize', this._resizeHandler);

        /* Allows CSS to determine size of canvas */
        this.canvas.width = window.outerWidth;
        this.canvas.height = window.outerHeight / 5;

        this.clearAndDraw();
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this._resizeHandler);
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.secondRect !== prevProps.secondRect) {
            this.clearAndDraw();
        }
    }


    clearAndDraw = () => {
        let context = this.canvas.getContext('2d');
        if(context){
            context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.draw(context)
        }

    }

    draw(context){
        let w = this.canvas.width;
        let h = this.canvas.height;
        let bottomLeftCorner = {x:0,y:h};
        let bottomRightCorner = {x:w,y:h};
        let innerBottomLeftCorner = {x:((w / 3.2) + (w / 1000)), y:((h / 2) + h / 8)};
        let innerBottomRightCorner = { x: ((w / 2) + (w / 5.5)),y:innerBottomLeftCorner.y};
        let innerTopRightCorner = { x: innerBottomRightCorner.x, y: (innerBottomLeftCorner.y - (h / 2.8)) };
        

        context.fillStyle = 'rgb(168, 170, 223)';
        context.fillRect(0, 0, w, h);
        context.fillStyle = 'rgb(35, 35, 73)';
        context.font = "5vw VT323";
        context.textAlign = 'center';
        context.fillText("Matrix Calculator".toUpperCase(), w/2, (h/2+h/20));

        // Draw the lower trapezoid
        context.beginPath();
        context.moveTo(0, h-1);
        context.lineTo(innerBottomLeftCorner.x, innerBottomLeftCorner.y);
        context.lineTo(innerBottomRightCorner.x, innerBottomRightCorner.y);
        context.lineTo(w, h-1);
        context.closePath();
        context.lineWidth = 2;
        context.strokeStyle = 'rgb(35, 35, 73)';
        context.stroke();
        // Draw the right trapezoid
        context.beginPath();
        context.moveTo(w, h);
        context.lineTo(innerBottomRightCorner.x-1, innerBottomRightCorner.y);
        context.lineTo(innerTopRightCorner.x-1, innerTopRightCorner.y);
        context.lineTo(w-1, 1);
        context.closePath();
        context.strokeStyle = 'rgb(35, 35, 73)';

        context.stroke();
        // Draw the left trapezoid
        context.beginPath();
        context.moveTo(0, h);
        context.lineTo(innerBottomLeftCorner.x, innerBottomRightCorner.y);
        context.lineTo(innerBottomLeftCorner.x - 1, innerTopRightCorner.y);
        context.lineTo(0, 1);
        context.closePath();
        context.strokeStyle = 'rgb(35, 35, 73)';

        context.stroke();
        // Draw the top trapezoid
        context.beginPath();
        context.moveTo(1, 1);
        context.lineTo(innerBottomLeftCorner.x, innerTopRightCorner.y);
        context.lineTo(innerTopRightCorner.x, innerTopRightCorner.y);
        context.lineTo(w, 1);
        context.closePath();
        context.lineWidth = 2;
        context.strokeStyle = 'rgb(35, 35, 73)';
        context.stroke();

        // Top and bottom trapezoid inner horizontal lines
        let outerLineSeparation = w/10;
        let innerLineSeparation = (innerBottomRightCorner.x-innerBottomLeftCorner.x)/10;
        for(let i = 1;i<10;i++){
            // Bottom lines
            context.beginPath();
            context.moveTo(outerLineSeparation*i, h); // Bottom
            context.lineTo(innerBottomLeftCorner.x+(innerLineSeparation*i), innerBottomRightCorner.y); // Inner bottom
            context.closePath();

            context.strokeStyle = 'rgb(74, 76, 154)';
            context.stroke();

            // Top Lines
            context.beginPath();
            context.moveTo(outerLineSeparation * i, 0); // Bottom
            context.lineTo(innerBottomLeftCorner.x + (innerLineSeparation * i), innerTopRightCorner.y); // Inner bottom
            context.closePath();
            context.stroke();
        }
        // Left and right trapezoid inner horizontal lines
        let outerSideLineSeparation = h / 5;
        let innerSideLineSeparation = (innerBottomRightCorner.y - innerTopRightCorner.y) / 5;
        for (let i = 1; i < 5; i++) {
            // Left lines
            context.beginPath();
            context.moveTo(0,outerSideLineSeparation * i); // Bottom
            context.lineTo(innerBottomLeftCorner.x, innerTopRightCorner.y + (innerSideLineSeparation * i)); // Inner bottom
            context.closePath();
            context.stroke();

            // Right lines
            context.beginPath();
            context.moveTo(w, outerSideLineSeparation * i); // Bottom
            context.lineTo(innerBottomRightCorner.x, innerTopRightCorner.y + (innerSideLineSeparation * i)); // Inner bottom
            context.closePath();
            context.stroke();
        }
    }
    render(){
        return(
            <canvas ref={canvas=>this.canvas = canvas}/>
        )
    }


}

module.exports = TitleCanvas;
