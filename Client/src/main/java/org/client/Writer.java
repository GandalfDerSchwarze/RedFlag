package org.client;

import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.net.Socket;

public class Writer{
    private Socket socket;
    private PrintWriter writer;
    private String user;

    public Writer(Socket socket, String user){
        this.socket = socket;
        this.user = user;

        try{
            this.writer = new PrintWriter(new OutputStreamWriter(socket.getOutputStream()));
        }catch (IOException e){
            System.out.println("Writer Error - Cant create PrintWriter");
            e.printStackTrace();
        }
    }

    public void write(String write){
        writer.println(user + ": " + write);
        writer.flush();
    }

    public void close(){
        try{
            socket.close();
            writer.close();
        }catch (IOException e){
            System.out.println("Writer Error - Cant close");
            e.printStackTrace();
        }
    }
}
