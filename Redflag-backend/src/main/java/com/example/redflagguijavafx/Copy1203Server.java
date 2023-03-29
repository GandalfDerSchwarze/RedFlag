package com.example.redflagguijavafx;

import javafx.scene.control.TextArea;

import java.io.IOException;
import java.net.ServerSocket;

public class Copy1203Server extends Thread{
    private static final int PORT = 8080;
    private TextArea print;

    public Copy1203Server(TextArea print){
        this.print = print;
    }

    @Override
    public void run() {
        startup();
        Copy1203Distributor distributor = new Copy1203Distributor(print);

        try (ServerSocket serverSocket = new ServerSocket(PORT)) {
            print.setText(print.getText() + "Server started on Port: " + PORT + "\n");
            while (true) {
                print.setText(print.getText() + "Server starts listening for connection attempts" + "\n");
                distributor.add(serverSocket.accept());

                print.setText(print.getText() + "Server cleanUp of Ports which are not used" + "\n");
                distributor.cleanUpPorts();
            }
        } catch (IOException e) {
            print.setText(print.getText() + "ServerSocket Error" + "\n");
            print.setText("ServerSocketError");
        }
    }

    private void startup() {
        print.setText(print.getText() + "\nServer is starting !" +
                "" +
                " \n __\n" +
                " \\  \\     _ _\n" +
                "  \\**\\ ___\\/ \\\n" +
                "X*#####*+^^\\_\\\n" +
                "  o/\\  \\\n" +
                "     \\__\\" + "\n");
    }
}