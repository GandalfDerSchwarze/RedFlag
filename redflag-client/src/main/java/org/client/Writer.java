package org.client;

import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.net.Socket;

@Slf4j
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
            log.error("Writer Error - Cant create PrintWriter", e);
        }
    }

    public void write(String write){
        writer.println(user.hashCode() + ":" + user + ": " + write);
        writer.flush();
    }

    public void close(){
        try{
            socket.close();
            writer.close();
        }catch (IOException e){
            log.error("Writer Error - Cant close", e);
        }
    }
}
