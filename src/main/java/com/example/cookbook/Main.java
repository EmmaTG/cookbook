package com.example.cookbook;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.function.Supplier;
import java.util.stream.Collectors;

public class Main {

    public static void main(String[] args) {
        String str = "hello";
        List<String> list = new ArrayList<>();
        List<String> newList = new ArrayList<>();
        String revStr = "";
        String[] strArr = str.split("");
        for (int i=strArr.length-1;i>=0;i--){
            list.add(strArr[i]);
        }
        newList=list.stream().map(x -> x + "*").collect(Collectors.toList());
        System.out.println(String.join("",newList));
    }
}
