package com.example.redflagguijavafx;

import javafx.fxml.FXML;
import javafx.scene.control.TextArea;

public class HelloController {
    private boolean isRunning = false;

    @FXML
    private TextArea print;

    @FXML
    protected void startServer(){
        if(!isRunning){
            isRunning = true;
            Copy1203Server server = new Copy1203Server(print);
            server.start();
        }
    }
}