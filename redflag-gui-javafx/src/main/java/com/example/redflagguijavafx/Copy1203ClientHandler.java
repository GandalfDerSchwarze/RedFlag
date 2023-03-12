package com.example.redflagguijavafx;

import javafx.scene.control.TextArea;

import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.LinkedList;
import java.util.List;

public class Copy1203ClientHandler {
    private static int connections = 0;

    private String id;
    private ServerSocket serverSocket;
    private List<PrintWriter> writer;
    private List<String> messages;
    private final String prevMessagesEnd = "END - all previous Messages sent";

    private TextArea print;

    public Copy1203ClientHandler(TextArea print, String id) {
        try {
            this.serverSocket = new ServerSocket(0);
        } catch (IOException e) {
            print.setText(print.getText() + "GRRRRRRRRR cant create new ServerSocket" + "\n");
        }
        this.id = id;
        this.print = print;
        this.writer = new LinkedList<>();
        this.messages = new LinkedList<>();
    }

    public int getPort() {
        return this.serverSocket.getLocalPort();
    }

    public String getId(){return this.id;}

    public void acceptNewSocket() {
        try {
            Socket client = this.serverSocket.accept();
            print.setText(print.getText() + client + " - connected to Handler" + "\n");
            connections++;

            PrintWriter printWriter = new PrintWriter(new OutputStreamWriter(client.getOutputStream()));
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(client.getInputStream()));
            this.writer.add(printWriter);

            new Thread(() -> {
                messages.forEach(s -> {
                    printWriter.println(s);
                    printWriter.flush();
                });
                printWriter.println(prevMessagesEnd);
                printWriter.flush();
                print.setText(print.getText() + "Handler sent previous Chat Messages to Client" + "\n");

                while (true) {
                    try {
                        String readLine = bufferedReader.readLine();
                        this.writer.forEach(writer -> {
                            writer.println(readLine);
                            writer.flush();
                        });
                        messages.add(readLine);
                        print.setText(print.getText() + "Handler read in a message and broadcast it to " + this.writer.size() + " clients" + "\n");
                    } catch (IOException e) {
                        print.setText(print.getText() + "Connection lost" + "\n");
                        break;
                    }
                }

                try{
                    client.close();
                    bufferedReader.close();
                    this.writer.remove(printWriter);
                    printWriter.close();
                    connections--;
                }catch (IOException e){
                    print.setText(print.getText() + "Closing error" + "\n");
                }
            }).start();
        } catch (IOException e) {
            print.setText(print.getText() + "AWWWW Man" + "\n");
        }
    }

    public int getConnections(){
        return connections;
    }

    public void startUp() {
        print.setText(print.getText() + "A new Handler on port " + this.serverSocket.getLocalPort() + " is starting up" + "\n");
    }
}